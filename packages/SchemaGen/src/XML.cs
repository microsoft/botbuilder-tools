using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Schema;

namespace SchemaGen
{
    public class XML
    {
        private const string _botLoader = "http://botframework.com/botloader";
        private static XmlQualifiedName _interface = new XmlQualifiedName("interface", _botLoader);
        private static XmlQualifiedName _implements = new XmlQualifiedName("implements", _botLoader);

        static XmlAttribute GetAttribute(XmlSchemaAnnotated element, XmlQualifiedName name)
        {
            XmlAttribute result = null;
            if (element.UnhandledAttributes != null)
            {
                foreach (var attribute in element.UnhandledAttributes)
                {
                    if (attribute.NamespaceURI == name.Namespace && attribute.LocalName == name.Name)
                    {
                        result = attribute;
                        break;
                    }
                }
            }
            return result;
        }

        struct Implementation
        {
            public XmlQualifiedName Name;
            public string Source;
            public string TargetNamespace;
        }

        public static void ProcessPatterns(List<string> schemaPatterns, string outPath, string allSchemaName)
        {
            var interfaces = new Dictionary<XmlQualifiedName, List<Implementation>>();
            var targets = new Dictionary<string, List<XmlSchema>>();
            var schemaSet = new XmlSchemaSet();
            schemaSet.ValidationEventHandler += ValidationCallback;
            foreach (var pattern in schemaPatterns)
            {
                foreach (var file in Directory.EnumerateFiles(Environment.CurrentDirectory, pattern))
                {
                    var reader = new XmlTextReader(file);
                    // Read as XML file in order to be able to resolve implements QNames.
                    int lastLine = 0;
                    int lastPos = 0;
                    XmlQualifiedName lastElementName = null;
                    string targetNamespace = null;
                    // Use XML reader to find implements tags
                    while (reader.MoveToNextAttribute() || reader.Read())
                    {
                        switch (reader.NodeType)
                        {
                            case XmlNodeType.Element:
                                if (reader.NamespaceURI == "http://www.w3.org/2001/XMLSchema"
                                    && reader.LocalName == "element")
                                {

                                    if (targetNamespace == null)
                                    {
                                        Console.WriteLine($"ERROR: No target namespace. {file} {reader.LineNumber}:{reader.LinePosition} {reader.Value}");
                                    }
                                    else
                                    {
                                        lastElementName = new XmlQualifiedName(reader.GetAttribute("name"), targetNamespace);
                                        lastLine = reader.LineNumber;
                                        lastPos = reader.LinePosition;
                                    }
                                }
                                break;
                            case XmlNodeType.Attribute:
                                if (reader.LocalName == "targetNamespace")
                                {
                                    targetNamespace = reader.Value;
                                }
                                else if (reader.NamespaceURI == _implements.Namespace
                                        && reader.LocalName == _implements.Name
                                        && lastElementName != null)
                                {
                                    var implements = reader.Value.Split(",");
                                    foreach (var implementation in implements)
                                    {
                                        var parts = implementation.Trim().Split(':');
                                        var nspace = parts.Length == 1 ? reader.LookupNamespace("") : reader.LookupNamespace(parts[0]);
                                        var name = parts[parts.Length - 1];
                                        var iName = new XmlQualifiedName(name, nspace);
                                        if (nspace == null)
                                        {
                                            Console.WriteLine($"ERROR: Missing namespace in implementation {file} {lastLine}:{lastPos} {implementation}");
                                        }
                                        else
                                        {
                                            if (!interfaces.TryGetValue(iName, out var implementations))
                                            {
                                                implementations = new List<Implementation>();
                                                interfaces[iName] = implementations;
                                            }
                                            implementations.Add(new Implementation
                                            {
                                                Name = lastElementName,
                                                Source = Path.GetFileName(file),
                                                TargetNamespace = targetNamespace
                                            });
                                        }
                                    }
                                }
                                break;
                        }
                    }
                    reader = new XmlTextReader(file);
                    var schema = XmlSchema.Read(reader, ValidationCallback);
                    schemaSet.Add(schema);
                }
            }
            schemaSet.Compile();
            /*
            foreach (XmlSchema schema in schemaSet.Schemas())
            {
                foreach (XmlQualifiedName elementName in schema.Elements.Names)

                {
                    var element = schema.Elements[elementName] as XmlSchemaElement;
                    if (element.UnhandledAttributes != null)
                    {
                        foreach (var attribute in element.UnhandledAttributes)
                        {
                            if (attribute.NamespaceURI == _botLoader && attribute.LocalName == "implements")
                            {
                                var implements = attribute.Value.Split(",");
                                foreach (var implementation in implements)
                                {
                                    var parts = implementation.Split(':');
                                    var nspace = parts.Length == 1 ? element.Namespaces[]
                                        ("") : reader.LookupNamespace(parts[0]);
                                    var name = parts[parts.Length - 1];
                                    var iName = new XmlQualifiedName(name, nspace);
                                    if (nspace == null)
                                    {
                                        Console.WriteLine($"ERROR: Missing namespace {file} {element.LineNumber}:{element.LinePosition} {implementation}");
                                    }
                                    else
                                    {
                                        if (!interfaces.TryGetValue(iName, out var implementations))
                                        {
                                            implementations = new List<XmlQualifiedName>();
                                            interfaces[iName] = implementations;
                                        }
                                        implementations.Add(element.QualifiedName);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            */
            foreach (XmlSchema schema in schemaSet.Schemas())
            {
                if (!targets.TryGetValue(schema.TargetNamespace, out var schemas))
                {
                    schemas = new List<XmlSchema>();
                    targets[schema.TargetNamespace] = schemas;
                }
                schemas.Add(schema);
                var imports = new List<Implementation>();
                var includes = new List<Implementation>();
                // schema.SourceUri = SchemaLocation(schema);
                foreach (XmlQualifiedName typeName in schema.SchemaTypes.Names)
                {
                    var type = schema.SchemaTypes[typeName] as XmlSchemaComplexType;
                    if (type != null)
                    {
                        var interfaceAttribute = GetAttribute(type, _interface);
                        if (interfaceAttribute != null && bool.Parse(interfaceAttribute.Value))
                        {
                            // Interface complex type
                            var particle = type.Particle as XmlSchemaGroupBase;
                            particle.Items.Clear();
                            if (interfaces.TryGetValue(typeName, out var implementations))
                            {
                                // Define the new complex type
                                foreach (var implementation in implementations)
                                {
                                    particle.Items.Add(new XmlSchemaElement() { RefName = implementation.Name });
                                    if (implementation.TargetNamespace == schema.TargetNamespace)
                                    {
                                        includes.Add(implementation);
                                    }
                                    else
                                    {
                                        imports.Add(implementation);
                                    }
                                }
                            }
                        }
                    }
                }
                var imported = new HashSet<string>();
                foreach (var import in imports)
                {
                    if (!imported.Contains(import.Source))
                    {
                        schema.Includes.Add(new XmlSchemaImport() { Namespace = import.TargetNamespace, SchemaLocation = import.Source });
                        imported.Add(import.Source);
                    }
                }
                var included = new HashSet<string>();
                foreach (var include in includes)
                {
                    if (!included.Contains(include.Source))
                    {
                        schema.Includes.Add(new XmlSchemaInclude() { SchemaLocation = include.Source });
                        included.Add(include.Source);
                    }
                }

            }
            var xml = new XmlDocument();
            var root = xml.CreateElement("bb", "components", "Microsoft.Bot.Builder");
            xml.AppendChild(root);
            var xsi = xml.CreateAttribute("xmlns", "xsi", "http://www.w3.org/2000/xmlns/");
            xsi.Value = "http://www.w3.org/2001/XMLSchema-instance";
            root.Attributes.Append(xsi);
            root.Attributes.Append(xml.CreateAttribute("xsi", "schemaLocation", "http://www.w3.org/2001/XMLSchema-instance"));

            // Consolidate each namespace
            foreach (var target in targets)
            {
                var nspace = target.Key;
                var schemas = target.Value;
                var combined = schemas[0];
                if (schemas.Count > 1)
                {
                    combined = new XmlSchema();
                    combined.TargetNamespace = nspace;
                    combined.SourceUri = "file:///./" + nspace + ".xsd";
                    foreach (var schema in schemas)
                    {
                        var include = new XmlSchemaInclude();
                        include.SchemaLocation = SchemaFileName(schema);
                        include.SourceUri = nspace;
                        combined.Includes.Add(include);
                        using (var writer = new StreamWriter(Path.Combine(outPath, SchemaFileName(schema))))
                        {
                            schema.Write(writer);
                        }
                    }
                    AddNamespace(root, combined.TargetNamespace, SchemaFileName(combined));
                    combined.SourceUri = "file:///" + nspace + ".xsd";
                }
                using (var writer = new StreamWriter(Path.Combine(outPath, SchemaFileName(combined))))
                {
                    combined.Write(writer);
                }
                using (var writer = XmlWriter.Create(Path.Combine(outPath, "example.xml"),
                    new XmlWriterSettings
                    {
                        Indent = true,
                        NewLineOnAttributes = true
                    }))
                {
                    xml.WriteTo(writer);
                }
            }
        }

        static int count = 0;
        static void AddNamespace(XmlElement root, string nspace, string location)
        {
            var xml = root.ParentNode as XmlDocument;
            var attr = xml.CreateAttribute("xmlns", $"c{count++}", "http://www.w3.org/2000/xmlns/");
            attr.Value = nspace;
            root.Attributes.Append(attr);
            var loc = root.GetAttributeNode("schemaLocation", "http://www.w3.org/2001/XMLSchema-instance");
            loc.Value += $"{nspace} {location} ";
        }

        static string SchemaFileName(XmlSchema schema)
        {
            return "./" + Path.GetFileName(new Uri(schema.SourceUri).LocalPath);
        }

        static string SchemaLocation(XmlSchema schema)
        {
            return SchemaFileName(schema);
        }

        static void ValidationCallback(object sender, System.Xml.Schema.ValidationEventArgs args)
        {
            if (args.Severity == XmlSeverityType.Warning)
            {
                Console.Write("WARNING: ");
            }
            else if (args.Severity == XmlSeverityType.Error)
            {
                Console.Write("ERROR: ");
            }
            Console.WriteLine($"{args.Exception.SourceUri} {args.Exception.LineNumber}:{args.Exception.LinePosition} {args.Message}");
        }

    }
}

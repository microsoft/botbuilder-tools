# .LG file format
.lg file will be a lot similar to the .lu file (to keep consistency across our files). 
At the root of the .lg idea we have the following main concepts
- Template
- Entity

The .lg file resembles a graph whose nodes are templates which might references other templates in addition to some explicit entity definitions.

## Template
- A template follows the follwoing pattern :
    ```bash
            # <TemplateName>
            - <Condition expression (optional, default expression always evaluates to true)>
                - <condition value> 
                - <condition value>
                .. ( and all the above could be repeated again, ie you can have n condition expression and their values)
            - Default
                - <default value> 
        ```
- The value in a template can refer to one or more other templates
- Value can include SSML/ markdown content 
- Circular references when nesting templates are not be supported
- Template references can be a fully resolved link
- Reference to another named template are denoted using [templateName] notation.  
Optionally, you can pass specific entities to a template resolution call using [templateName(entity1, entity2)] notation. 

- Example | simple conditionless template :
    ```sh
        # HelloTemplate
            - Hi 
            - Hello
            - Welcome
    ```
- Example | simple template with simple true/false condition :
    ```sh
        # SmartHelloTemplate
            - Case: {knowUserName}
                - Hi {userName}
                - Welcome {userNAme}
            - Default
                - Hello
    ```
- Example | simple template with value condition :
    ```bash
        # OfferHelp
            - Case: {knowUserLocation = true} && {userLocation} = "Cairo"
                - Would you like to know our special offers in Cairo store ?
            - Case: {knowUserLocation = true} && {userLocation} != "Cairo"
                - Would you like to assign an operator from  {userLocation} store to help you ?
            - Default
                - How can I help you Today ?
    ```
- Example | simple conditionless parameterized template :
    ```sh
        # HelloTemplate(userName)
            - Hi {userName}
            - Hello {userName}
    ```
## Entity
- Denoted via {entityName} notation when used directly within a text value (ie : without explicit declaration, and in this case it's default type is assumed to be a string)
- When used as a parameter within a predefined macro helper function or as a parameter to a template resolution call, they are simply expressed as entityName 
- entities can have one of the following types and are defined the same way as they are defined in LU files. 
    -- Types: String, Int, Long, Float, Double, Bool, DateTime 
- when defiend explicitly in the .lg file the follow the following pattern :
`<entityName>:<entityType> `    
- Example:  
    -- `$partySize : Integer` 
    -- `$deliveryAddress : String` 
- entities can optionally support a list of additional decorations like "Say-as" tags, "Capitalization" etc. They are represented as a list of <attribute>=<value> pairs on the entity type definition line 
    -- Example:  
        --- `$deliveryAddress : String say-as = Address` 
## Other concepts
- Comments are expressed via the standard markdown notation '>' this is a comment and the entire line will be treated as a comment', example ```> LG for book table```
- Predefined macro helper functions - these are a collection of pre-defined helper functions available for developers to use in condition evaluation or inline in a text value. These will denoted using    
    -- {macroname(param1, param2, …)} notation. 
    -- "isEqual(foo, bar)" as a condition expression 
    -- "Sure, I will set an alarm for {dateReadOut(alarmDateTime)} {timeOfDay(alarmTime)}" as a text value
- Predefined macro helper function calls as well as template resolution calls can accept either an entity name or an explicit string value.  
    -- E.g. ```"isEqual(foo, 'expected value')"``` or ```"[templateName(entity1, 'AM')]" ```
- Predefined macro helper functions support nested calls.  
    -- E.g. ```"isEqual(timeOfDay(alarmDateTime), 'morning')" ```
- Use '\' as escape character. E.g. ```"You can say cheese and tomato \\[toppings are optional\\]" ```
- Please refer to the [callbacks](https://github.com/Microsoft/botbuilder-tools/tree/mslg/packages/MSLG/docs/callbacks.md) for more information about the available macro functions 

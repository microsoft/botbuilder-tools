/**
 * @description
 * Represents an interface for any object wishing to implement a simplistic
 * SDK for writing markdown files.
 */
export interface IMarkdownWriter {
    addFirstLevelHeader(header: string): IMarkdownWriter;

    addSecondLevelHeader(header: string): IMarkdownWriter;

    addThirdLevelHeader(header: string): IMarkdownWriter;

    addStatement(statement: string): IMarkdownWriter;

    addListItem(statement: string, indentation?: number): IMarkdownWriter;

    addComment(comment: string): IMarkdownWriter;

    addLink(text: string, href: string): IMarkdownWriter;

    addNewLine(): IMarkdownWriter;

    render(): string;
}

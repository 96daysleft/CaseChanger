import * as cases from "change-case";

export class ConvertCaseType {

    public readonly name: string;
    public readonly runFunction: (input: string) => string;
    public readonly example: string;

    constructor(name:string,runFunction: (input: string) => string, example: string) {
        this.name = name;
        this.runFunction = runFunction;
        this.example = example;
    }
}

export class Transform {
    public readonly camel: ConvertCaseType;
    public readonly constant: ConvertCaseType;
    public readonly dot: ConvertCaseType;
    public readonly kebab: ConvertCaseType;
    public readonly lower: ConvertCaseType;
    public readonly pascal: ConvertCaseType;
    public readonly sentence: ConvertCaseType;
    public readonly snake: ConvertCaseType;
    public readonly none: ConvertCaseType;
    public readonly capital: ConvertCaseType;
    public readonly upper: ConvertCaseType;

    public readonly exampleBase: string;

    public readonly caseTypes: string[];


    // Constructor to initialize the readonly properties
    constructor() {
        this.camel = new ConvertCaseType('camel', cases.camelCase,'helloWorld');
        this.constant = new ConvertCaseType('constant', cases.constantCase,'HELLO_WORLD');
        this.dot = new ConvertCaseType('dot', cases.dotCase,'hello.world');
        this.kebab = new ConvertCaseType('kebab', cases.paramCase,'hello-world');
        this.lower = new ConvertCaseType('lower',this.toLower,'hello world');
        this.pascal = new ConvertCaseType('pascal',cases.pascalCase,'HelloWorld');
        this.sentence = new ConvertCaseType('sentence', cases.sentenceCase,'Hello world');
        this.snake = new ConvertCaseType('snake',cases.snakeCase,'hello_world');
        this.none = new ConvertCaseType('none',cases.noCase,'hello world');
        this.capital = new ConvertCaseType('capital', cases.capitalCase,'Hello world');
        this.upper = new ConvertCaseType('upper', this.toUpper,'HELLO WORLD');
        this.exampleBase = 'hello world';
        this.caseTypes = Object.values(this)
            .filter(value => value instanceof ConvertCaseType)
            .map(caseType => caseType.name);
    }

    private toUpper(text:string):string{
        return text.toUpperCase();
    }
      
    private toLower(text:string):string{
        return text.toLowerCase();
    }

    // public transformCase(selectedText:string, caseType: string){
    //     const caseTypeInstance = this.getCaseTypeInstance(caseType);
    //     if (!caseTypeInstance) {
    //         throw new Error(`Invalid case type: ${caseType}`);
    //     }

    //     this.transformCase(selectedText, caseTypeInstance.name);
    // }

    // Overloaded method signatures
    public transformCase(selectedText: string, caseType: string): string;
    public transformCase(selectedText: string, caseType: ConvertCaseType): string;

  
    public transformCase(selectedText: string, caseType: string | ConvertCaseType): string {
        if (typeof caseType === 'string') {
            const caseTypeInstance = this.getCaseTypeInstance(caseType);
            if (!caseTypeInstance) {
                throw new Error(`Unknown case type: ${caseType}`);
            }
            caseType = caseTypeInstance;
            if (!caseType) {
                throw new Error(`Unknown case type: ${caseType}`);
            }
        }
        const leadingWhitespace = selectedText.match(/^[ \t]*/)?.[0] || '';
        const trailingWhitespace = selectedText.match(/[ \t]*$/)?.[0] || '';
        const convertedText = caseType.runFunction(selectedText.trim());
        
        return `${leadingWhitespace}${convertedText}${trailingWhitespace}`;
    }

    private getCaseTypeInstance(caseType: string): ConvertCaseType | undefined {
        return (this as any)[caseType];
    }
}
import * as cases from "change-case";
import { ConvertCaseType } from './convertCaseType';

export class ConvertCaseTypes {
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


    // Constructor to initialize the readonly properties
    constructor() {
        this.camel = new ConvertCaseType('camel', cases.camelCase);
        this.constant = new ConvertCaseType('constant', cases.constantCase);
        this.dot = new ConvertCaseType('dot', cases.dotCase);
        this.kebab = new ConvertCaseType('kebab', cases.paramCase);
        this.lower = new ConvertCaseType('lower',this.toLower );
        this.pascal = new ConvertCaseType('pascal',cases.pascalCase);
        this.sentence = new ConvertCaseType('sentence', cases.sentenceCase);
        this.snake = new ConvertCaseType('snake',cases.snakeCase);
        this.none = new ConvertCaseType('none',cases.noCase );
        this.capital = new ConvertCaseType('capital', cases.capitalCase);
        this.upper = new ConvertCaseType('upper', this.toUpper );
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
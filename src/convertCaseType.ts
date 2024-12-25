export class ConvertCaseType {

    public readonly name: string;
    public readonly runFunction: (input: string) => string;

    constructor(name:string,runFunction: (input: string) => string){
        this.name = name;
        this.runFunction = runFunction;
    }
}
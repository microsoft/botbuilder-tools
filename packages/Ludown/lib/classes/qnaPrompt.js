
class qnaPrompt { 
    /**
     * @property {QnAObj} QnAObj
     */

    constructor(QnAObj,parsedContent) {
        //console.log(QnAObj)
        var tmpQnAObj = JSON.parse(JSON.stringify(QnAObj))
        this.displayOrder =  0;
        this.displayText =  tmpQnAObj.questions[0];
        
        //delete QnAObj.metadata
        if(tmpQnAObj.hasOwnProperty("prompts"))
        {
            tmpQnAObj.context = {
                "isContextOnly": false,
                "prompts": [],
            }
            // Handle Nested Prompts
            for(var j=0; j < tmpQnAObj.prompts.length;j++)
            {
                var NestedQnAObject = parsedContent.qnaJsonStructure.qnaList.filter(item => item.id === tmpQnAObj.prompts[j])[0]
                tmpQnAObj.context.prompts.push(new qnaPrompt(NestedQnAObject,parsedContent))
            }
            delete tmpQnAObj.prompts            
        }
        delete tmpQnAObj.id
        this.qna = tmpQnAObj;
        
    }
}

module.exports = qnaPrompt;
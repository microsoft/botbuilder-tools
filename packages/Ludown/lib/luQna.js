const QnaDefinitionContext = require('./generated/LUFileParser').LUFileParser.QnaDefinitionContext;

class LUQna {
    /**
     * 
     * @param {QnaDefinitionContext} parseTree 
     */
    constructor(parseTree) {
        this.ParseTree = parseTree;
        this.Questions = [this.ExtractQuestion(parseTree)];
        this.Questions = this.Questions.concat(this.ExtractMoreQuestions(parseTree));
        this.FilterPairs = this.ExtractFilterPairs(parseTree);
        this.Answer = this.ExtractAnswer(parseTree);
    }

    ExtractQuestion(parseTree) {
        return parseTree.qnaQuestion().questionText().getText().trim();
    }

    ExtractMoreQuestions(parseTree) {
        let questions = [];
        let questionsBody = parseTree.moreQuestionsBody();
        for (const question of questionsBody.moreQuestion()) {
            let questionText = question.getText().trim();
            questions.push(questionText.substr(1).trim());
        }

        return questions;
    }

    ExtractFilterPairs(parseTree) {
        let filterPairs = [];
        let filterSection = parseTree.qnaAnswerBody().filterSection();
        if (filterSection) {
            let filterLines = filterSection.filterLine();
            for (const filterLine of filterLines) {
                let filterLineText = filterLine.getText().trim();
                filterLineText = filterLineText.substr(1).trim()
                let filterPair = filterLineText.split('=');
                let key = filterPair[0].trim();
                let value = filterPair[1].trim();
                filterPairs.push({ key, value });
            }
        } 

        return filterPairs;
    }

    ExtractAnswer(parseTree) {
        let multiLineAnswer = parseTree.qnaAnswerBody().multiLineAnswer().getText().trim();
        let answer = multiLineAnswer.slice(11, multiLineAnswer.length - 3);
        
        return answer;
    }
}

module.exports = LUQna;
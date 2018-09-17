const assert = require('assert');
const chatdown = require('../lib');
const path = require('path');
const botFrameworkPngPath = path.join(__dirname, 'bot-framework.png')
const helpJsonPath = path.join(__dirname, 'help.json')

describe('The chatdown lib', () => {
    describe('should correctly output data', () => {
        it('when the input chat contains an attachment', async () => {
            const conversation = `
user=Joe
bot=LulaBot
user: Hello!
bot: Hello, can I help you?
user: I need an image
bot: here you go!
[AttachmentLayout=carousel]
[Attachment=${botFrameworkPngPath}]
bot: Another one1
[AttachmentLayout=list]
[Attachment=${botFrameworkPngPath}]
`;
            const activities = await chatdown(conversation, {});
            assert.equal(activities.length, 6);
            assert.equal(activities[4].attachments.length, 1);
            assert.equal(activities[5].attachments.length, 1);
        });

        it('when the input chat contains [Delay=xxxx] instructions', async () => {
            const conversation = `
user=Joe
bot=LulaBot
user: Hello!
bot: hi! [Typing]
[Delay=5000] How are you?
`;

            const activities = await chatdown(conversation, {});
            let ts = new Date(activities[2].timestamp).getTime() - new Date(activities[1].timestamp).getTime();
            assert(ts === 2000);
            ts = new Date(activities[3].timestamp).getTime() - new Date(activities[2].timestamp).getTime();
            assert(ts === 100);
            ts = new Date(activities[4].timestamp).getTime() - new Date(activities[3].timestamp).getTime();
            assert(ts === 5000);
        });

        it('when a content type must be inferred from the file extension in an attachment', async () => {
            const conversation = `
user=Joe
bot=LulaBot
user: Hello!
bot: [Typing]
[Delay=5000] How are you?,
user: Good, hit me with a help fiassert(activities[3].Attachment.length);le!
bot: [Attachment=${helpJsonPath}] here you go!
`;

            const activities = await chatdown(conversation, {});
            assert(activities[5].attachments[0].contentType === 'application/json');
        });

        it('when base64 data is expected in the attachment', async () => {
            const conversation = `
user=Joe
bot=LulaBot
user: Hello!
bot: [Typing]
[Delay=5000] How are you?,
user: Good, hit me with a help file!
bot: [Attachment=${botFrameworkPngPath}] here you go!
`;

            const activities = await chatdown(conversation, {});
            assert.doesNotThrow(() => Buffer.from(activities[5].attachments[0].contentUrl, 'base64'));
        });

        it('when JSON string data is expected in the attachment', async () => {
            const conversation = `
            user=Joe
bot=LulaBot
user: Hello!
bot: [Typing]
[Delay=5000] How are you?,
user: Good, hit me with a help file!
bot: [Attachment=${helpJsonPath}] here you go!
`;

            const activities = await chatdown(conversation, {});
            assert(typeof activities[5].attachments[0].content === 'object');
        });

        it('when the input chat contains multiple empty lines', async () => {
            const conversation = `
user=Joe
bot=LulaBot

user: Yo!



bot: Sup?

            `;

            const activities = await chatdown(conversation, {});
            assert(activities.length === 3);
        });
    });

    describe('should throw', () => {

        it('when the chat contains an attachment that points to a non existent file "ENOENT"', async () => {
            const conversation = `
user=Joe
bot=LulaBot
user: Hello!
bot: [Typing]
[Delay=5000] How are you?,
user: Good, hit me with a help file!
bot: [Attachment=notThere.json] here you go!
`;

            try {
                await chatdown(conversation, {});
                assert.fail('did not throw', 'will throw');
            } catch (e) {
                assert(e.code === 'ENOENT');
            }
        });
    });

    describe('should output the expected activities', () => {
        it('with the same conversationId in each conversation', async () => {
            const conversation = [
                'user=Joe',
                'bot=LulaBot',
                'user: Hello!',
                'bot: Hi there. How can I help you?',
                'user: What time is is?',
                'bot: It\'s go time!'
            ];

            const activities = await chatdown(conversation.join('\n'), {});
            const id = activities[0].conversation.id;
            activities.forEach(activity => {
                assert(activity.conversation.id === id);
            });
        });

        it('with unique ids for each activity', async () => {
            const conversation = [
                'user=Joe',
                'bot=LulaBot',
                'user: Hello!',
                'bot: Hi there. How can I help you?',
                'user: What time is is?',
                'bot: It\'s go time!'
            ];

            const activities = await chatdown(conversation.join('\n'), {});
            let ids = {};
            activities.forEach(activity => {
                assert(ids[activity.id] === undefined);
                ids[activity.id] = true;
            });
        });

        it('With alternating from and recipient ids', async () => {
            const conversation = [
                'user=Joe',
                'bot=LulaBot',
                'user: Hello!',
                'bot: Hi there. How can I help you?',
                'user: What time is is?',
                'bot: It\'s go time!'
            ];

            const activities = await chatdown(conversation.join('\n'), {});
            let previousRecipientId;
            activities.forEach((activity, index) => {
                if (activity.type == 'message') {
                    const recipient = (activity.recipient || {});
                    if (index > 1) {
                        assert(recipient.id === previousRecipientId);
                    }
                    previousRecipientId = activity.from.id;
                }
            });
        });

        it('with the appropriate messages', async () => {
            const conversation = [
                'user=Joe',
                'bot=LulaBot',
                'user: Hello!',
                'bot: Hi there. How can I help you?',
                'user: What time is is?',
                'bot: It\'s go time!'
            ];

            const activities = await chatdown(conversation.join('\n'), {});
            activities.forEach((activity, index) => {
                if (activity.type == 'message') {
                    assert(activity.text.trim() === conversation[index + 1].replace('user: ', '').replace('bot: ', ''));
                }
            });
        });

        it('when a message contains newlines', async () => {
            const conversation = `
user=Joe
bot=LulaBot
user: Hello!
bot: Hi there. How can I help you?,
user: I need a sandwich!
bot: Great!. I have the following choices:
* Ham and Cheese
* Turkey bacon club
* Veggie on sourdough`;

            const activities = await chatdown(conversation, {});
            assert(activities.length === 5);
            assert(activities[4].text.trim().split('\n').length === 4);
        });

        it('when static use default message time gap of 2000ms', async () => {
            const conversation = `
bot=LulaBot
user: Hello!
bot: Hello, can I help you?`;

            const activities = await chatdown(conversation, { static: true });
            assert.equal(activities.length, 3);
            assert.equal(activities[1].timestamp, new Date(new Date(activities[0].timestamp).getTime() + 2000).toISOString());
        });

        it('support multiline conversationupdate', async () => {
            const conversation = `
[ConversationUpdate=
    MembersAdded=Joe,Susan]
[ConversationUpdate=
    MembersRemoved=Susan]
bot->Joe: Hi Joe!`;

            chatdown(conversation)
                .then((result) => {
                    assert.equal(result[0].type, 'conversationUpdate', "wrong type 0");
                    assert.equal(result[1].type, 'conversationUpdate', "wrong type 1");
                    assert.equal(result[2].type, 'conversationUpdate', "wrong type 2");
                    assert.equal(result[0].membersAdded[0].name, 'bot', 'bot should be first');
                    assert.equal(result[1].membersAdded[0].name, 'Joe', 'Joe should be first');
                    assert.equal(result[1].membersAdded[1].name, 'Susan', 'Susan should be second');
                    assert.equal(result[2].membersRemoved[0].name, 'Susan', 'Susan should be removed');
                })
                .catch((reason) => assert.fail('failed to output'));
        });

        it('Reject invalid conversationupdate', async () => {
            const conversation = `
[ConversationUpdate=
    invalid=Joe,Susan]
`;
            chatdown(conversation)
                .then(() => assert.fail('should have thrown exception'))
                .catch(() => assert.ok(true, "yay"));
        });

        it('support message card types', async () => {
            const conversation = `
bot:[Herocard   
    title=Cheese gromit!
    subtitle=Hero Card
    text=This is some text describing the card, it's cool because it's cool
    image=${botFrameworkPngPath}
    buttons=Option 1| Option 2| Option 3]
bot:[ThumbnailCard   
    title=Cheese gromit!
    subtitle=Hero Card
    text=This is some text describing the card, it's cool because it's cool
    image=${botFrameworkPngPath}
    buttons=Option 1| Option 2| Option 3]
bot:[AudioCard   
    title=Cheese gromit!
    subtitle=Hero Card
    text=This is some text describing the card, it's cool because it's cool
    image=${botFrameworkPngPath}
    buttons=Option 1| Option 2| Option 3]
bot:[VideoCard   
    title=Cheese gromit!
    subtitle=Hero Card
    text=This is some text describing the card, it's cool because it's cool
    image=${botFrameworkPngPath}
    buttons=Option 1| Option 2| Option 3]
bot:[AnimationCard   
    title=Cheese gromit!
    subtitle=Hero Card
    text=This is some text describing the card, it's cool because it's cool
    autoloop=true
    images=${botFrameworkPngPath}
    buttons=Option 1| Option 2| Option 3]
bot:[MediaCard 
    title=Cheese gromit!
    subtitle=Hero Card
    text=This is some text describing the card, it's cool because it's cool
    media=${botFrameworkPngPath}
    buttons=Option 1| Option 2| Option 3]
[Signincard=
    Title=BotFramework Sign-in Card
    Buttons=Sign-in]
[OauthCard=
    Title=BotFramework Sign-in Card
    Buttons=Sign-in]`;

            chatdown(conversation)
                .then((result) => assert.ok(result, "ok"))
                .catch(() => assert.fail('should not have thrown exception'));
        });
    });

    it('support suggested Actions', async () => {
        const conversation = 
`bot: Hello [Suggestions=option 1|option 2]
bot:[Suggestions=option 3|option 4]`;

        var result = await chatdown(conversation);
        assert.equal(result[1].suggestedActions.actions[0].title, 'option 1');
        assert.equal(result[1].suggestedActions.actions[0].value, 'option 1');
        assert.equal(result[1].suggestedActions.actions[1].title, 'option 2');
        assert.equal(result[1].suggestedActions.actions[1].value, 'option 2');
        assert.equal(result[2].suggestedActions.actions[0].title, 'option 3');
        assert.equal(result[2].suggestedActions.actions[0].value, 'option 3');
        assert.equal(result[2].suggestedActions.actions[1].title, 'option 4');
        assert.equal(result[2].suggestedActions.actions[1].value, 'option 4');
    });
});
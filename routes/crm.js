var edge = require('edge');

exports.sdkmessages = function (req, res) {

    var getXmlForRequest = edge.func({
        assemblyFile: 'lib/crm-sdk-message-generator.exe',
        typeName: 'crm_sdk_message_generator.Program',
        methodName: 'GetXmlForRequestAsync'
    });

    var getSdkMessages = edge.func({
        assemblyFile: 'lib/crm-sdk-message-generator.exe',
        typeName: 'crm_sdk_message_generator.Program',
        methodName: 'GetSdkMessagesAsync'
    });

    if (req.params.message) {
        getXmlForRequest(req.params.message, function (error, response) {
            if (error) {
                console.log(error);
            }
            res.set('Content-Type', 'text/plain');
            res.send((response) ? response.replace(/&quot;/g, '"')
               .replace(/&gt;/g, '>')
               .replace(/&lt;/g, '<')
               .replace(/&amp;/g, '&') : error || '');
        });
    } else {
        getSdkMessages(null, function (error, response) {
            if (error) {
                console.log(error);
            }

            res.render('index', {
                title: 'CRM Sdk Message Generator',
                messages: response || []
            })
        });
    }
}
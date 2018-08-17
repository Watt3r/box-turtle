// 2014 XDN Developers
// 2018 TurtleCoin Developers

/* Format to two decimal places */
function fromAtomic(num)
{
    return (num / 100).toFixed(2);
}

function toAtomic(num)
{
    return Math.round(num * 100);
}


function sendTransaction(address, amount, fee, extra, paymentId)
{
    var resultNode = document.getElementById("rpc-result");

    resultNode.innerHTML = "Send Transaction is disabled in DEMO mode";
}

function getBalance()
{
    var resultNode = document.getElementById("rpc-result");
    resultNode.innerHTML = "Locked: "
                                     + 0.00
                                     + " TRTL"
                                     + "</br>Unlocked: "
                                     + 550123.00
                                     + " TRTL";
}

function getTransactions()
{
    var resultNode = document.getElementById("rpc-result");
	resultNode.innerHTML = "Transfer recived! Amount " + 100;
    resultNode.innerHTML += "<br>";
	resultNode.innerHTML += "Transfer Sent! Amount " + -2500;
    resultNode.innerHTML += "<br>";
    resultNode.innerHTML += "Transfer Sent! Amount " + -600;
    resultNode.innerHTML += "<br>";
    resultNode.innerHTML += "Transfer recived! Amount " + 550000;
	resultNode.innerHTML += "<br>";
}
// Tread lightly
function getKeys()
{
	var resultNode = document.getElementById("rpc-result");

    resultNode.innerHTML = "Get Keys is disabled in DEMO mode";
	
}
function getStatus()
{
    var resultNode = document.getElementById("rpc-result");
    resultNode.innerHTML = "Done syncing, you can use your wallet safely"
}

$(document).ready(function()
{
    document.getElementById('rpcHost').value = config.host;
    document.getElementById('rpcPort').value = config.port;

    var resultNode = document.getElementById("rpc-result");

    $('#getBalance').click(function()
    {
        console.log('getBalance() clicked...');
        getBalance();
    });

    $('#sendTransaction').click(function()
    {
        console.log('sendTransaction() clicked...')
        resultNode.innerHTML = "";

        var address = $("#address").val();
        var amount = $("#amount").val();
        var fee = $("#fee").val();
		var paymentId = $("#paymentId").val();
        var extra = $("#extra").val();

        if (address.length != config.addressLength || !address.startsWith("TRTL"))
        {
            resultNode.innerHTML = "Address is incorrect length! Should be "
                                 + config.addressLength + " characters and start with TRTL.";
            return;
        }

        if (amount < config.minAmount)
        {
            resultNode.innerHTML = "Amount is too small! Must be at least "
                                 + config.minAmount + " TRTL.";
            return;
        }

        if (fee < config.minFee)
        {
            resultNode.innerHTML = "Fee is too small! Must be at least "
                                 + config.minFee + " TRTL.";
            return;
        }
		
		if (paymentId) {
				console.log("has PaymentId");
				
				if (!(/^[0-9A-F]{64}$/i.test(paymentId))) {
					resultNode.innerHTML = "PaymentId is not a hexdecimal 64 byte string!"
					return;
				}
                sendTransaction(address, amount, fee, null, paymentId);
		}
        if (extra) {
                console.log("has extra");
                
                if (!(/^[0-9a-fA-F]+$/.test(extra))) {
                    console.log("Extra is not a hexdecimal byte string! Converting automajically")
                

                    var arr1 = [];
                    for (var n = 0, l = extra.length; n < l; n ++) 
                     {
                        var hex = Number(extra.charCodeAt(n)).toString(16);
                        arr1.push(hex);
                     }
                    extra = arr1.join('');
                    console.log(extra)
                }
                sendTransaction(address, amount, fee, extra, null);
        }
        if (extra && paymentId) {
            resultNode.innerHTML = "Cannot have paymentId and extra set!";
            return;
        }
        if (!(extra || paymentId)) {
            sendTransaction(address, amount, fee);
        }
        
        
    });
	$('#getAddresses').click(function()
    {
        console.log('getAddresses() clicked...');
        resultNode.innerHTML = "Address TRTLuxXuMJYPAWwbqUpBPkjWA79hLdb6G5CF4fjqhdgP8ufhbLcFWNRPJiwtdZ5QcDgukvXT8yVxXSoXrehdwnRTZwDLQCMVoNf";
    });
	$('#getTransactions').click(function()
    {
        console.log('getTransactions() clicked...');
        getTransactions();
    });
	$('#getKeys').click(function()
    {
        console.log('getKeys() clicked...');
        getKeys();
    });
    $('#getStatus').click(function()
    {
        console.log('getStatus() clicked...');
        getStatus();
    });
});

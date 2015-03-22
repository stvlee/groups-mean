'use strict';

//var http = require('http');
//
//http.get("http://dmartin.org:8021/atms/v1/atm?Format=XML&Country=USA&PostalCode=63146&PageOffset=0&PageLength=10", function(res) {
//    console.log("Got response: " + res);
//}).on('error', function(e) {
//    console.log("Got error: " + e.message);
//});

//var parseString = require('xml2js').parseString;
//parseString(body, function (err, result) {
//    console.dir(result);
//});


var request = require('request'),
    parser = require('xml2json');

//request('http://dmartin.org:8021/atms/v1/atm?Format=XML&Country=USA&PostalCode=63146&PageOffset=0&PageLength=10', function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//
//        //console.log(body)
//
//        var json = parser.toJson(body);
//        console.log(json);
//
//    }
//});



//request.post('http://dmartin.org:8021/repower/v1/repower', {form:{key:'value'}});
//
//var xml = '<?xml version="1.0" encoding="UTF-8"?> <RepowerRequest> <!--Transaction related information--> <TransactionReference>2000000001010101011</TransactionReference> <CardNumber>1234567890123452</CardNumber> <TransactionAmount> <Value>5000</Value> <Currency>840</Currency> </TransactionAmount> <LocalDate>1230</LocalDate> <LocalTime>092435</LocalTime> <!--Card Acceptor Information--> <Channel>W</Channel> <ICA>009674</ICA> <ProcessorId>9000000442</ProcessorId> <RoutingAndTransitNumber>123456789</RoutingAndTransitNumber> <MerchantType>6532</MerchantType> <CardAcceptor> <Name>Prepaid Card Load Store</Name> <City>St Charles</City> <State>MO</State> <PostalCode>63301</PostalCode> <Country>USA</Country> </CardAcceptor> <!-- EMV and PayPass--> <PaymentPosEntryMode>070</PaymentPosEntryMode> <CardSequenceNumber>011</CardSequenceNumber> <POSCardDataTerminalInputCapabilityIndicator>3</POSCardDataTerminalInputCapabilityIndicator> <ICCEMVData>5F2A02064382025C00950500000000009A030306199C01009F02060000000100009F10200012A08003242000961F00000000000000FF00000000000000000000000000009F1A0206439F2701809F360200A29F3704000000569F4104000066829F260878F10CB66852EA62</ICCEMVData> <PaymentInitiationChannel>01</PaymentInitiationChannel> <TransactionFee> <Value>250</Value> <Currency>840</Currency> </TransactionFee> <AdditionalSenderInformation>1234567891234567891202031985Cash</AdditionalSenderInformation> <ReceiverTrack2Data>1234567890123452=241210100000860</ReceiverTrack2Data> </RepowerRequest>'
//request({
//    url: "http://dmartin.org:8021/repower/v1/repower",
//    method: "POST",
//    headers: {
//        "content-type": "application/xml"  // <--Very important!!!
//    },
//    body: xml
//}, function (error, response, body){
//    console.log(response);
//});



//var xml = '<?xml version="1.0" encoding="utf-8"?> <ns2:TerminationInquiryRequest xmlns:ns2="http://mastercard.com/termination"> <AcquirerId>1996</AcquirerId> <Merchant> <Name>TEST</Name> <Address> <Line1>TEST</Line1> <City>St. Louis</City> <CountrySubdivision>MO</CountrySubdivision> <PostalCode>55555</PostalCode> <Country>USA</Country> </Address> <Principal> <FirstName>John</FirstName> <LastName>Smith</LastName> <Address> <CountrySubdivision>MO</CountrySubdivision> <PostalCode>55555</PostalCode> <Country>USA</Country> </Address> </Principal> </Merchant> </ns2:TerminationInquiryRequest>'
//request({
//    url: "http://dmartin.org:8021/fraud/merchant/v1/termination-inquiry",
//    method: "POST",
//    headers: {
//        "content-length": 581,
//        "content-type": "application/xml"  // <--Very important!!!
//    },
//    body: xml
//}, function (error, response, body){
//    console.log(response);
//});



//
var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_MGNiNzhkMGEtNzQwOS00NjMxLTlkMGEtZGVmNTc3MDQ1MmNk',
        privateKey: 'IO6mm2j8xX5p7kZh61HaODLcz+D99k28KcvLgMJTT015YFFQL0ODSXAOkNtXTToq'
    });

//client.payment.create({
//    amount : "1000",
//    token : "f21da65e-f0ab-45cb-b8e6-40b493c3671f",
//    description : "payment description",
//    reference : "7a6ef6be31",
//    currency : "USD"
//}, function(errData, data){
//
//    if(errData){
//        console.error("Error Message: " + errData.data.error.message);
//        // handle the error
//        return;
//    }
//
//    console.log("Payment Status: " + data.paymentStatus);
//});

client.payment.create({
    amount : "123123",
    description : "payment description",
    card : {
        expMonth : "11",
        expYear : "19",
        cvc : "123",
        number : "5555555555554444"
    },
    currency : "USD"
}, function(errData, data){
    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        return;
    }
    console.log("Payment id: " + data.id);
    console.log("Payment Status: " + data.paymentStatus);
});

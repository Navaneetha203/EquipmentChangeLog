sap.ui.define(["sap/ui/core/util/MockServer", "sap/ui/model/json/JSONModel", "sap/base/util/UriParameters", "sap/base/Log"], function (e, t,
	r, a) {
	"use strict";
	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init: function() {
			// create
			var oMockServer = new e({
				rootUri: "/"
			});

			// simulate against the metadata and mock data
			oMockServer.simulate("/localService/metadata.xml", {
				sMockdataBaseUrl: "/localService/mockdata",
				bGenerateMissingMockData: true
			});
			
			// var aRequests = oMockServer.getRequests();
			// aRequests.push({
			// 	method: "GET",
			// 	path: "/ZEQuipmentChangeLogSet",
			// 	response: function(oXhr) {
			// 		a.debug("Incoming request for ZEQuipmentChangeLogSet");
			// 		var today = new Date();
			// 		today.setHours(0); // or today.toUTCString(0) due to timezone differences
			// 		today.setMinutes(0);
			// 		today.setSeconds(0);
			// 		jQuery.ajax({
			// 			url: "/ZEQuipmentChangeLogSet",
			// 			dataType : 'json',
			// 			async: false,
			// 			success : function(oData) {
			// 				oXhr.respondJSON(200, {}, JSON.stringify(oData));
			// 			}
			// 		});
			// 		return true;
			// 	}
			// });
			// oMockServer.setRequests(aRequests);

			// //handling custom URL parameter step
			// var fnCustom = function(oEvent) {
			// 	var oXhr = oEvent.getParameter("oXhr");
			// 	if (oXhr && oXhr.url.indexOf("first") > -1) {
			// 		oEvent.getParameter("oFilteredData").results.splice(3, 100);
			// 	}
			// };
			// oMockServer.attachAfter("GET", fnCustom, "ZEQuipmentChangeLogSet");
			// start
			oMockServer.start();

			a.info("Running the app with mock data");
		}

	};
	
});
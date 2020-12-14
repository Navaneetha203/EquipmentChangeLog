sap.ui.define(["sap/ui/test/opaQunit","./pages/Worklist","./pages/Browser","./pages/NotFound","./pages/App"],function(e){"use strict";QUnit.module("NotFound");e("Should see the resource not found page when changing to an invalid hash",function(e,o,n){e.iStartMyFLPApp({intent:"NPPDEquipmentChangeLog-display"});o.onTheBrowser.iChangeTheHashToSomethingInvalid();n.onTheNotFoundPage.iShouldSeeResourceNotFound()});e("Clicking the 'Show my worklist' link on the 'Resource not found' page should bring me back to the worklist",function(e,o,n){o.onTheAppPage.iWaitUntilTheAppBusyIndicatorIsGone();o.onTheNotFoundPage.iPressTheNotFoundShowWorklistLink();n.onTheWorklistPage.iShouldSeeTheTable()});e("Should see the not found text for no search results",function(e,o,n){o.onTheWorklistPage.iSearchForSomethingWithNoResults();n.onTheWorklistPage.iShouldSeeTheNoDataTextForNoSearchResults()});e("Clicking the back button should take me back to the not found page",function(e,o,n){o.onTheBrowser.iPressOnTheBackwardsButton();n.onTheNotFoundPage.iShouldSeeResourceNotFound();n.iLeaveMyFLPApp()});e("Should see the 'Object not found' page if an invalid object id has been called",function(e,o,n){e.iStartMyFLPApp({intent:"NPPDEquipmentChangeLog-display",hash:"ZIEQ_CHANGE_LOGSet/SomeInvalidObjectId"});n.onTheNotFoundPage.iShouldSeeObjectNotFound()});e("Clicking the 'Show my worklist' link on the 'Object not found' page should bring me back to the worklist",function(e,o,n){o.onTheAppPage.iWaitUntilTheAppBusyIndicatorIsGone();o.onTheNotFoundPage.iPressTheObjectNotFoundShowWorklistLink();n.onTheWorklistPage.iShouldSeeTheTable();n.iLeaveMyFLPApp()})});
sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel", "../model/formatter"], function (e, t, n) {
	"use strict";
	return e.extend("com.mindset.EquipmentLog.controller.Object", {
		formatter: n,
		onInit: function () {
			var e, n = new t({
				busy: true,
				delay: 0
			});
			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
			e = this.getView().getBusyIndicatorDelay();
			this.setModel(n, "objectView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function () {
				n.setProperty("/delay", e)
			})
		},
		onShareInJamPress: function () {
			var e = this.getModel("objectView"),
				t = sap.ui.getCore().createComponent({
					name: "sap.collaboration.components.fiori.sharing.dialog",
					settings: {
						object: {
							id: location.href,
							share: e.getProperty("/shareOnJamTitle")
						}
					}
				});
			t.open()
		},
		_onObjectMatched: function (e) {
			var objectId = e.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function () {
				var odataModel = this.getModel().createKey("ZIEQ_CHANGE_LOGSet", {
					ChangeId: objectId
				});
				this._bindView("/" + odataModel);
			}.bind(this));
		},
		_bindView: function (objectId) {
			var t = this.getModel("objectView"),
				n = this.getModel();
			this.getView().bindElement({
				path: objectId,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						n.metadataLoaded().then(function () {
							t.setProperty("/busy", true)
						})
					},
					dataReceived: function () {
						t.setProperty("/busy", false)
					}
				}
			})
		},
		_onBindingChange: function () {
			var e = this.getView(),
				t = this.getModel("objectView"),
				n = e.getElementBinding();
			if (!n.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return
			}
			var i = this.getResourceBundle(),
				o = e.getBindingContext().getObject(),
				a = o.ChangeId,
				s = o.EquipmentId;
			t.setProperty("/busy", false);
			this.addHistoryEntry({
				title: this.getResourceBundle().getText("objectTitle") + " - " + s,
				icon: "sap-icon://enter-more",
				intent: "#NPPDEquipmentChangeLog-display&/ZIEQ_CHANGE_LOGSet/" + a
			});
			t.setProperty("/saveAsTileTitle", i.getText("saveAsTileTitle", [s]));
			t.setProperty("/shareOnJamTitle", s);
			t.setProperty("/shareSendEmailSubject", i.getText("shareSendEmailObjectSubject", [a]));
			t.setProperty("/shareSendEmailMessage", i.getText("shareSendEmailObjectMessage", [s, a, location.href]))
		}
	})
});
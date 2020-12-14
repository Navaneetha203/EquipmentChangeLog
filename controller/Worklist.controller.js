sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel", "../model/formatter", "sap/ui/model/Filter", "sap/ui/model/Sorter"],
	function (e, t, i, s, r) {
		"use strict";
		return e.extend("com.mindset.EquipmentLog.controller.Worklist", {
			formatter: i,
			onInit: function () {
				this._mViewSettingsDialogs = {};
				var e, i, s = this.byId("table");
				i = s.getBusyIndicatorDelay();
				this._oTable = s;
				this._aFilter = [];
				this._aSorter = [];
				e = new t({
					worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
					saveAsTileTitle: this.getResourceBundle().getText("saveAsTileTitle", this.getResourceBundle().getText("worklistViewTitle")),
					shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
					shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
					shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
					tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
					tableBusyDelay: 0
				});
				this.setModel(e, "worklistView");
				s.attachEventOnce("updateFinished", function () {
					e.setProperty("/tableBusyDelay", i)
				});
				this.addHistoryEntry({
					title: this.getResourceBundle().getText("worklistViewTitle"),
					icon: "sap-icon://table-view",
					intent: "#NPPDEquipmentChangeLog-display"
				}, true)
			},
			onExit: function () {
				var e, t;
				for (e in this._mViewSettingsDialogs) {
					t = this._mViewSettingsDialogs[e];
					if (t) {
						t.destroy()
					}
				}
			},
			createViewSettingsDialog: function (e) {
				var t = this._mViewSettingsDialogs[e];
				if (!t) {
					t = sap.ui.xmlfragment(e, this);
					this._mViewSettingsDialogs[e] = t
				}
				return t
			},
			handleSortButtonPressed: function () {
				this.createViewSettingsDialog("com.mindset.EquipmentLog.view.SortDialog").open()
			},
			handleFilterButtonPressed: function () {
				this.createViewSettingsDialog("com.mindset.EquipmentLog.view.FilterDialog").open()
			},
			handleSortDialogConfirm: function (e) {
				var t = this.byId("table"),
					i = e.getParameters(),
					s = t.getBinding("items"),
					n, a, o = [];
				n = i.sortItem.getKey();
				a = i.sortDescending;
				o.push(new r(n, a));
				this._aSorter = o;
				s.sort(o)
			},
			handleFilterDialogConfirm: function (e) {
				var t = this.byId("table"),
					i = e.getParameters(),
					r = t.getBinding("items"),
					n = [];
				i.filterItems.forEach(function (e) {
					var t = e.getKey().split("___"),
						i = t[0],
						r = t[1],
						a = t[2],
						o = new s(i, r, a);
					n.push(o)
				});
				this._aFilter = n;
				r.filter(n);
				this.byId("vsdFilterBar").setVisible(n.length > 0);
				this.byId("vsdFilterLabel").setText(i.filterString)
			},
			onUpdateFinished: function (e) {
				var t, i = e.getSource(),
					s = e.getParameter("total");
				if (s && i.getBinding("items").isLengthFinal()) {
					t = this.getResourceBundle().getText("worklistTableTitleCount", [s])
				} else {
					t = this.getResourceBundle().getText("worklistTableTitle")
				}
				this.getModel("worklistView").setProperty("/worklistTableTitle", t)
			},
			onPress: function (e) {
				this._showObject(e.getSource())
			},
			onSearch: function (e) {
				if (e.getParameters().refreshButtonPressed) {
					this.onRefresh()
				} else {
					var t = e.getParameter("newValue");
					this._applySearch(t)
				}
			},
			onRefresh: function () {
				var e = this.byId("table");
				e.getBinding("items").refresh()
			},
			_showObject: function (e) {
				this.getRouter().navTo("object", {
					objectId: e.getBindingContext().getProperty("ChangeId")
				})
			},
			_applySearch: function (e) {
				var t = this._oTable;
				var i = t.getBindingInfo("items");
				i.parameters = i.parameters || {};
				i.parameters.custom = i.parameters.custom || {};
				i.parameters.custom.search = e;
				t.bindItems(i);
				var s = t.getBinding("items");
				s.filter(this._aFilter);
				s.sort(this._aSorter)
			}
		})
	});
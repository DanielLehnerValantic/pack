sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Fragment, Filter, FilterOperator) {
      "use strict";

      return Controller.extend("com.valantic.pack.controller.fragments.WorkCenterVH", {
          onInit: function () {

          },

          onValueHelpRequest: function (oEvent) {
            var sInputValue = oEvent.getSource().getValue(),
                oView = this.getView();

            if (!this._pValueHelpDialog) {
                this._pValueHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.valantic.pack.view.fragments.WorkCenterVH",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pValueHelpDialog.then(function(oDialog) {
                // Create a filter for the binding
                oDialog.getBinding("items").filter([new Filter("Arbeitsplatz", FilterOperator.Contains, sInputValue)]);
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open(sInputValue);
            });
        },

        onValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("Arbeitsplatz", FilterOperator.Contains, sValue);

            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onValueHelpClose: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            oEvent.getSource().getBinding("items").filter([]);

            if (!oSelectedItem) {
                return;
            }

            this.byId("workCenter").setValue(oSelectedItem.getTitle());
        }
      });
  });

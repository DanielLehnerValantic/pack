sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Core",
  "sap/ui/core/Fragment",
  "sap/ui/core/format/DateFormat",
  'sap/m/MessageToast',
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/FilterType",
  "com/valantic/pack/utils/Formatter",
  "com/valantic/pack/model/models"
], function (Controller, Core, Fragment, DateFormat ,MessageToast, Filter, FilterOperator, FilterType, formatter, models) {
  "use strict";

  return Controller.extend("com.valantic.pack.controller.BaseController", {
      bus: Core.getEventBus(),    
      JSONModel:[],
      formatter:formatter,
      models:models,
      
      onInit: function () {
          this.oMessageManager = sap.ui.getCore().getMessageManager();
          this.getView().setModel(this.oMessageManager.getMessageModel(), "messages");       
      },

      getRouter:function(oContext){
          return sap.ui.core.UIComponent.getRouterFor(oContext);            
      },

      getModel:function(sName){
          return this.getView().getModel(sName);
      },

      getoDataModel:function(sName){
          return this.getOwnerComponent().getModel(sName);
      },

      setModel:function(oData,sName){
          return this.getView().setModel(oData,sName);
      },

      showMessageToast:function(sMessage){
          MessageToast.show(sMessage);
      },

      geti18n:function(sId, sParam){
          return this.getView().getModel("i18n").getResourceBundle().getText(sId);
      },

      getEmptyJson:function(){
          return this.models.getEmptyJson();
      },

      openMessageBox:function(oButton){
          this._getMessagePopover().then(function (oMessagePopover) {
              oMessagePopover.openBy(oButton);
          });
      },

      addArrayToFilter:function(aFilter, oObject, sName){
          if(!oObject){
              return aFilter;
          }            
          
          oObject.forEach(function (oItem){
                  aFilter.push(new Filter(sName, FilterOperator.EQ, oItem.key));
          });

          return aFilter;
      },

      addObjectToFilter:function(aFilter, oObject, sName, bContains, bNotEqual){
          
          if(bNotEqual)            
          {
              var oFilterOperator = FilterOperator.NE;
          } else {
              var oFilterOperator = FilterOperator.EQ;
          }

          if(bContains){
              oFilterOperator = FilterOperator.Contains;
          }
          
          if(oObject){
              aFilter.push(new Filter(sName, oFilterOperator, oObject));
          }

          return aFilter;
      },

      showBusyIndicator:function(){
          sap.ui.core.BusyIndicator.show();
      },

      hideBusyIndicator:function(){
          sap.ui.core.BusyIndicator.hide();
      },

      _onMessagePopoverPress: function (oEvent) {
          var oSource = oEvent.getSource();
          this._getMessagePopover().then(function (oMessagePopover) {
              oMessagePopover.openBy(oSource);
          });
      },
      _getMessagePopover: function () {
          if (!this._oMessagePopover) {
              var oView = this.getView();
              this._oMessagePopover = Fragment.load({
                  id: oView.getId(),
                  name: "com.valantic.pack.view.fragments.MessagePopover",
                  controller: this
              }).then(function (oMessagePopover) {
                  oView.addDependent(oMessagePopover);
                  return oMessagePopover;
              });
          }

          return this._oMessagePopover;
      },

      _onMessageClear: function (oEvent) {
          sap.ui.getCore().getMessageManager().removeAllMessages();
      },
      
  });
});

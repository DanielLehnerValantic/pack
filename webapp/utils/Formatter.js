

   sap.ui.define(["sap/ui/core/format/DateFormat"], function (DateFormat) {
    "use strict";
    return {
          parseInt:function(value){
              return Number(value);
          },
  
          parseFloat:function(value){
              return value;
          },
  
          convertNumberInput:function(value){
              if(value==""){
                  value = "0";                        
              }
              return value;
          },
  
          _formatMessageDate: function (sDate) {
              return DateFormat.getDateTimeInstance({
                  style: "short"
              }).format(new Date(sDate), false);
  
          },
          _formatMessageCounter: function (aMessages) {
              if (aMessages && aMessages.length > 0) {
                  var aFiltered = aMessages.filter(message => message.code !== "/IWBEP/CX_SD_GEN_DPC_BUSINS");
                  return aFiltered.length.toString();
              } else {
                  return "0";
              }
          },
          _formatMessageType:function(aMessages){
              var sHighestSeverity;
        var aMessages = this.oMessageManager.getMessageModel().oData;
        aMessages.forEach(function (sMessage) {
          switch (sMessage.type) {
            case "Error":
              sHighestSeverity = "Reject";
              break;
            case "Warning":
              sHighestSeverity = sHighestSeverity !== "Reject" ? "Default" : sHighestSeverity;
              break;
            case "Success":
              sHighestSeverity = sHighestSeverity !== "Reject" && sHighestSeverity !== "Default" ?  "Success" : sHighestSeverity;
              break;
            default:
              sHighestSeverity = !sHighestSeverity ? "Default" : sHighestSeverity;
              break;
          }
        });
              sHighestSeverity = !sHighestSeverity ? "Default" : sHighestSeverity;
  
        return sHighestSeverity;
          },
          _formatMessageIcon: function (aMessages) {
              var sIcon;
        var aMessages = this.oMessageManager.getMessageModel().oData;
  
        aMessages.forEach(function (sMessage) {
          switch (sMessage.type) {
            case "Error":
              sIcon = "sap-icon://message-error";
              break;
            case "Warning":
              sIcon = sIcon !== "sap-icon://message-error" ? "sap-icon://message-warning" : sIcon;
              break;
            case "Success":
              sIcon = "sap-icon://message-error" && sIcon !== "sap-icon://message-warning" ? "sap-icon://sys-enter-2" : sIcon;
              break;
            default:
              sIcon = !sIcon ? "sap-icon://message-information" : sIcon;
              break;
          }
        });
              sIcon = !sIcon ? "sap-icon://message-information" : sIcon;
        return sIcon;
      },
    };
  });
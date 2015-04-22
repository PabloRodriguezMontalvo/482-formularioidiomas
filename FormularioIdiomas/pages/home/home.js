(function () {
    "use strict";



    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            WinJS.UI.processAll();
            WinJS.Resources.processAll(document.querySelector("body"));

            document.getElementById("ddlIdioma").addEventListener("change", function() {

                var desp = document.getElementById("ddlIdioma");
                var opc = desp.options[desp.selectedIndex].value;

                WinJS.Resources._getResourceContext().languages =
                    new Array(opc);
            });
            document.getElementById("btnEnviar").addEventListener("click",
                function() {
                    var errores = "";
                    var fa = new Date();
                    fa.setYear(fa.getYear() - 18);

                    if (!document.getElementById("txtAcepto").checked) {
                        errores += WinJS.Resources.getString("error_condiciones").
                            value + "\n";

                    }

                    var dp = document.getElementById("txtFecha").winControl;
                    var fsel = dp.current;

                    if (fa<=fsel) {
                        var formateador = new Windows.Globalization.
                            DateTimeFormatting.DateTimeFormatter("day month year");
                        errores += WinJS.Resources.getString("error_fecha").
                           value + " Fecha minima "+ formateador.format(fa)+ "\n";

                    }


                    if (errores !== "") {
                        new Windows.UI.Popups.MessageDialog(errores).showAsync();
                    }



                });
            WinJS.Resources.addEventListener("contextchanged", function() {
                WinJS.Resources.processAll(document.querySelector("body"));
            });
        }
    });
})();

window.addEventListener("load", myMain, false);

function myMain(evt) {
    var jsInitChecktimer = setInterval(checkForJS_Finish, 1500);

    function checkForJS_Finish() {
        if (document.readyState === 'complete') {
            clearInterval(jsInitChecktimer);
            console.log("hello");
            var num = 0
            setInterval(function () {
                if ($("._5qi9._5qib:not(._3001)").length !== num) {
                    num = $("._5qi9._5qib:not(._3001)").length;
                    getBG()
                }
            }, 1000)

            function getBG() {
                $("._5qi9._5qib").each(function () {
                    var id = $(this).find("._4jeg a").attr("data-hovercard").toString().match(/\d+/);
                    $(this).find("._4jeg").find(".findID").remove()
                    $(this).find("._4jeg").append("<span style='margin-left: 8px;' class='findID' id='" + id + "' title='UID: " + id + ", click để copy uid'>&#169;</span>")
                })
                $(".findID").click(function (event) {
                    console.log("click");
                    event.preventDefault();
                    var $temp = $("<input>");
                    $("body").append($temp);
                    $temp.val($(this).attr("id")).select();
                    document.execCommand('copy');
                    $temp.remove();
                })
                chrome.storage.local.get('bgChat_HuynhNhon', function (obj) {
                    if (obj.bgChat_HuynhNhon.length > 0) {
                        obj.bgChat_HuynhNhon.forEach(val => {
                            var $tabChat = $("._5qi9._5qib")
                            var chatWindow = $tabChat.find("a._2yg8[data-hovercard = '/ajax/hovercard/chat.php?id=" + val.uid + "&type=chat']:eq(0)")
                            var colortext = (chatWindow.parents('._6vu5._6z9d.fbNubFlyoutInner._6vu1').find('._1ia._2sz2').css('background-color'));
                            chatWindow.parents('._6vu5._6z9d.fbNubFlyoutInner._6vu1').find("._1i6a")
                                .attr('style', "background-image : url('" + val.bgUrl + "') !important");
                            // chatWindow.parents('._6vu5._6z9d.fbNubFlyoutInner._6vu1').find('._4tdt._ua0 ._1aa6')
                            //     .attr('style', "background-color: "+colortext+" !important");
                            chatWindow.parents('._6vu5._6z9d.fbNubFlyoutInner._6vu1').find('._510g._510e.seen')
                                .attr('style', "color: #fff !important")
                        });
                    }
                })
            }
            

        }
    }
}
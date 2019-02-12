window.addEventListener("load", myMain, false);

function myMain(evt) {
    var jsInitChecktimer = setInterval(checkForJS_Finish, 1500);

    function checkForJS_Finish() {
        if (document.readyState === 'complete') {
            clearInterval(jsInitChecktimer);
            console.log("hello");
            if ($(location).attr('href').indexOf('https://www.facebook.com/messages/') !== -1) {
                var temp = 0
                getBGMess()
                $('li._5l-3._1ht1').click(function () {
                    getBGMess()
                })

                function getBGMess() {
                    var timer = setInterval(function () {
                        var $nameElement = $('span._3oh- a')
                        let uid = $nameElement.attr("uid")
                        console.log("1");
                        if (uid !== temp) {                            
                            clearInterval(timer)
                            console.log("2");
                            temp = uid
                            chrome.storage.local.get('bgChat_HuynhNhon', function (obj) {
                                var bgInfo = obj.bgChat_HuynhNhon.find(x => x.uid == uid)
                                if (bgInfo !== undefined) {
                                    setTimeout(function () {
                                        console.log($("._4u-c._1wfr._9hq").length);
                                        $nameElement.parents('._20bp').find("._4_j4")
                                            .attr("style", "background-image: url('" + bgInfo.bgUrl + "') !important;")

                                    },200)
                                }

                            })
                        }

                    }, 400)

                }
            } else {
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
                        $(this).find("._4jeg").prepend("<span style='margin-right: 8px;' class='findID' id='" + id + "' title='UID: " + id + ", click để copy uid'>&#169;</span>")
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
                                chatWindow.parents('._6vu5._6z9d.fbNubFlyoutInner._6vu1')
                                    .attr('style', "border: " + colortext + " solid 1px !important; border-bottom:none !important");
                                chatWindow.parents('._6vu5._6z9d.fbNubFlyoutInner._6vu1').find('._510g._510e.seen ._510f')
                                    .attr('style', "color: #fff !important;background: #0c1;padding: 3px 5px;margin-bottom: 5px;border-radius: 25px;")
                                chatWindow.parents('._6vu5._6z9d.fbNubFlyoutInner._6vu1').find("._5w-5 ._5w-6")
                                    .attr("style", "color: #e2dbdb !important;")
                            });
                        }
                    })
                }
            }



        }
    }
}
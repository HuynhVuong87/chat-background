var port = chrome.runtime.connect()
var listBg = []
var temp = {}
chrome.storage.local.get('bgChat_HuynhNhon', function (obj) {
    chrome.storage.local.get('tempBgChat', function (obj1) {
        temp = obj1.tempBgChat
        console.log(temp);
        $('#uid').val(temp.uid)
        $('#bgUrl').val(temp.bgUrl)
        listBg = (obj.bgChat_HuynhNhon);
        console.log(obj.bgChat_HuynhNhon);
        if (listBg.length > 0) {
            getList(listBg)
        }
        $('.btn-add').click(function () {
            var uid = $('#uid').val();
            var bgUrl = $('#bgUrl').val()
            if (uid !== "" && bgUrl !== "") {
                let ind = listBg.findIndex(x => x.uid == uid)
                if (ind == -1) {
                    listBg.unshift({
                        uid: uid,
                        bgUrl: bgUrl
                    })
                    $('#uid').val("")
                    $('#bgUrl').val("")
                    chrome.storage.local.set({
                        bgChat_HuynhNhon: listBg
                    }, function () {
                        getList(listBg)
                        chrome.storage.local.set({
                            tempBgChat: {
                                uid: "",
                                bgUrl: ""
                            }
                        })
                    });

                } else {
                    alert("Bạn đã thêm hình nền cho người dùng này rồi");
                    $('#uid').val("")
                    $('#bgUrl').val("")
                }

            }
        })
        $("input#uid").on("change paste keyup", function () {
            temp.uid = $(this).val()
            chrome.storage.local.set({
                tempBgChat: temp
            })
        });
        $("input#bgUrl").on("change paste keyup", function () {
            temp.bgUrl = $(this).val()
            chrome.storage.local.set({
                tempBgChat: temp
            })
        });
        $('span.delete').click(function () {
            var uidDel = $(this).attr("id");
            console.log(uidDel);
            let ind = listBg.findIndex(x => x.uid == uidDel)
            if (ind !== -1) {
                listBg.splice(ind, 1)
                chrome.storage.local.set({
                    bgChat_HuynhNhon: listBg
                }, function () {
                    getList(listBg)
                });
            }
        })

        function getList(list) {
            $('ul#list').html("");
            list.forEach(function (val) {
                $('ul#list').append("<li><b>" + val.uid + ":</b> <span>" + val.bgUrl + "</span> <span class='delete' id='" + val.uid + "'>x</span> </li>");
            })
        }
    })

});
document.getElementById('button1').addEventListener('click', function() {
    // 在當前分頁執行js代碼
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: unlockCopyRestrictions
        });
    });
});

// 解除禁止複製
function unlockCopyRestrictions() {
    var elements = document.querySelectorAll('*');
    elements.forEach(function(element) {
        element.oncopy = null;
        element.oncut = null;
        element.oncontextmenu = null;
        element.onselectstart = null;
        element.onmousedown = null;
        element.onmouseup = null;
        element.onmousemove = null;
        element.onkeydown = null;
        element.onkeyup = null;
        element.onkeypress = null;
        element.style.userSelect = "auto";
        element.style.webkitUserSelect = "auto";
        element.style.msUserSelect = "auto";
        element.style.mozUserSelect = "auto";
    });

    document.addEventListener('copy', function(e) {
        e.stopPropagation();
    }, true);

    document.addEventListener('cut', function(e) {
        e.stopPropagation();
    }, true);

    document.addEventListener('contextmenu', function(e) {
        e.stopPropagation();
    }, true);

    document.addEventListener('selectstart', function(e) {
        e.stopPropagation();
    }, true);
}

document.getElementById("button2").addEventListener("click", function() {
    // 在當前分頁執行js代碼
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: remove_login_restriction
        });
    });
});

// 繞過登入限制 https://gitee.com/scgywx/autoexpandcsdn
function remove_login_restriction () {
    var e = document.querySelectorAll('.hide-article-box');
    if (e.length > 0) {
        // 移除所有找到的 .hide-article-box 元素
        e.forEach(function(element) {
            element.parentElement.removeChild(element);
        });
        // 移除 #article_content 的內嵌樣式
        var article_content = document.getElementById('article_content');
        if (article_content) {
            article_content.removeAttribute('style');
        }
    }
    // 可用 但付費解鎖太長的不能 https://www.cnblogs.com/r1-12king/p/17326536.html
    // var article_content=document.getElementById("article_content");
    // article_content.removeAttribute("style");
    // var follow_text=document.getElementsByClassName('follow-text')[0];
    // follow_text.parentElement.parentElement.removeChild(follow_text.parentElement);
    // var hide_article_box=document.getElementsByClassName(' hide-article-box')[0];
    // hide_article_box.parentElement.removeChild(hide_article_box);
}
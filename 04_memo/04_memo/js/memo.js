"use strict";

// 1. ページが読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded", function () {

    // 1. localStorage が使えるか確認
    if (typeof localStorage === "undefined") {
        window.alert("このブラウザは Local Storage に対応していません");
        return;
    } else {
        viewStorage();
        saveLocalStorage(); // 2. localStorage への保存
    }
}, false);

// 2. localStorage への保存
function saveLocalStorage() {
    const save = document.getElementById("save");

    save.addEventListener("click", function (e) {
        e.preventDefault();

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        // 入力チェック
        if (key === "" || value === "") {
            window.alert("Key、Memoはいずれも必須です。");
            return;
        } else {
            localStorage.setItem(key, value);
            viewStorage();
            let w_msg = "LocalStorage に「" + key + " : " + value + "」を保存しました。";
            window.alert(w_msg);

            // 入力欄のクリア
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
        }
    }, false);
}

// localStorageからのデータの取得（しゅとく）とテーブルへ表示（ひょうじ）
function viewStorage() {

    const list = document.getElementById("list");
    // htmlのテーブル初期化（しょきか）
    while (list.rows[0]) list.deleteRow(0);

    // localStorageすべての情報（じょうほう）の取得（しゅとく）
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        // localStorageのキーと値（あたい）を表示（ひょうじ）
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

}
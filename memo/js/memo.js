"use strict";

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener(
  "DOMContentLoaded",
  function () {
    // 1. localStorage が使えるか確認
    if (typeof localStorage === "undefined") {
      window.alert("このブラウザはLocal Storage機能が実装されていません");
      return;
    } else {
      viewStorage();
      saveLocalStorage(); // 2. localStorage への保存
      delLocalStorage();
      allClearLocalStorage();
      selectTable();
    }
  },
  false
);

// 2. localStorageへの保存
function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;

      // 値の入力チェック
      if (key === "" || value === "") {
        window.alert("Key、Memoはいずれも必須です。");
        return;
      } else {
        let w_confirm = window.confirm(
          "LocalStorageに\n" + key + "：" + value + "\nを保存しますか？"
        );

        if (w_confirm === true) {
          localStorage.setItem(key, value);
          viewStorage();

          let w_msg =
            "LocalStorageに" + key + "：" + value + "を保存しました。";
          window.alert(w_msg);

          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      }
    },
    false
  );
}

// 削除処理（★修正あり）
function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener(
    "click",
    function (e) {
      e.preventDefault();

      const key = selectCheckBox();

      if (key !== null) {
        let w_confirm = window.confirm(
          "LocalStorageから選択されているデータを削除しますか？"
        );

        if (w_confirm === true) {
          localStorage.removeItem(key);
          viewStorage();

          let w_msg =
            "LocalStorageから" + key + "を削除しました。";
          window.alert(w_msg);

          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      }
    },
    false
  );
}

// 全削除
function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener(
    "click",
    function (e) {
      e.preventDefault();

      let w_confirm = window.confirm(
        "LocalStorageのデータを全て削除します。よろしいですか？"
      );

      if (w_confirm === true) {
        localStorage.clear();
        viewStorage();

        let w_msg = "LocalStorageのデータを全て削除しました。";
        window.alert(w_msg);

        document.getElementById("textKey").value = "";
        document.getElementById("textMemo").value = "";
      }
    },
    false
  );
}

// テーブル選択
function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      selectCheckBox();
    },
    false
  );
}

// チェック処理（★修正あり）
function selectCheckBox() {
  let w_cnt = 0;

  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");

  let w_textKey = "";
  let w_textMemo = "";

  for (let i = 0; i < chkbox1.length; i++) {
    if (chkbox1[i].checked) {
      if (w_cnt === 0) {
        w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
        w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
      }
      w_cnt++;
    }
  }

  if (w_cnt === 1) {
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

    return w_textKey; // ★ keyを返す
  } else {
    window.alert("1つ選択してください。");
    return null;
  }
}

// 表示処理
function viewStorage() {
  const list = document.getElementById("list");

  while (list.rows[0]) {
    list.deleteRow(0);
  }

  for (let i = 0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }

  $("#table1").tablesorter({
    sortList: [[1, 0]],
  });

  $("#table1").trigger("update");
}

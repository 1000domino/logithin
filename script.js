const thinkingTrigger = document.getElementById("thinkingTrigger");
const hiddenThinking = document.getElementById("hiddenThinking");

thinkingTrigger.addEventListener("click", function () {

  const isOpen = hiddenThinking.classList.toggle("open");

  thinkingTrigger.classList.toggle("active", isOpen);

  thinkingTrigger.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

  const label = thinkingTrigger.querySelector("small");

  if (label) {
    label.textContent = isOpen
      ? "思考をとじる"
      : "思考をひらく";
  }

});

/* =====================================
   POST 04 / MECE
===================================== */

const meceButton = document.getElementById("meceButton");
const meceStage = document.getElementById("meceStage");
const meceButtonText = document.getElementById("meceButtonText");
const meceStatus = document.getElementById("meceStatus");


if (meceButton && meceStage) {

  meceButton.addEventListener("click", function () {

    const isOrganized =
      meceStage.classList.toggle("organized");

    meceButton.classList.toggle(
      "active",
      isOrganized
    );


    if (isOrganized) {

      meceButtonText.textContent =
        "もう一度バラバラにする";

      meceStatus.textContent =
        "QUESTIONS → STRUCTURE";

    } else {

      meceButtonText.textContent =
        "整理してみる";

      meceStatus.textContent =
        "RANDOM THOUGHTS";

    }

  });

}

/* =====================================
   WHY SO? × SO WHAT?
===================================== */

const whyButton =
  document.getElementById("whyButton");

const soWhatButton =
  document.getElementById("soWhatButton");

const whyNodes =
  document.querySelectorAll(".why-node");

const whyLines =
  document.querySelectorAll(".why-line");

const soWhatNodes =
  document.querySelectorAll(".sowhat-node");

const soWhatLines =
  document.querySelectorAll(".sowhat-line");

const whyCount =
  document.getElementById("whyCount");

const soWhatCount =
  document.getElementById("soWhatCount");

const axisComplete =
  document.getElementById("axisComplete");


let currentWhyStep = 0;
let currentSoWhatStep = 0;


/* =====================================
   WHY SO?
===================================== */

if (whyButton) {

  whyButton.addEventListener("click", function () {

    if (currentWhyStep >= 2) {
      return;
    }

    currentWhyStep++;


    /*
      WHY側は
      CURRENTに近い REASON 01 から
      上方向へ出したい。

      HTMLでは
      REASON02 → REASON01
      の順番なので、
      data-stepで取得する。
    */

    const node =
      document.querySelector(
        `.why-node[data-step="${currentWhyStep}"]`
      );

    const line =
      document.querySelector(
        `.why-line[data-step="${currentWhyStep}"]`
      );


    /*
      まず線
      → 少し遅れてノード
    */

    if (line) {
      line.classList.add("visible");
    }

    setTimeout(function () {

      if (node) {
        node.classList.add("visible");
      }

    }, 180);


    whyCount.textContent =
      `${currentWhyStep} / 2`;


    if (currentWhyStep === 2) {

      whyButton.classList.add("complete");

      const small =
        whyButton.querySelector("small");

      if (small) {
        small.textContent = "根拠を確認しました";
      }

    }


    checkAxisComplete();

  });

}


/* =====================================
   SO WHAT?
===================================== */

if (soWhatButton) {

  soWhatButton.addEventListener("click", function () {

    if (currentSoWhatStep >= 2) {
      return;
    }

    currentSoWhatStep++;


    const line =
      document.querySelector(
        `.sowhat-line[data-step="${currentSoWhatStep}"]`
      );

    const node =
      document.querySelector(
        `.sowhat-node[data-step="${currentSoWhatStep}"]`
      );


    if (line) {
      line.classList.add("visible");
    }

    setTimeout(function () {

      if (node) {
        node.classList.add("visible");
      }

    }, 180);


    soWhatCount.textContent =
      `${currentSoWhatStep} / 2`;


    if (currentSoWhatStep === 2) {

      soWhatButton.classList.add("complete");

      const small =
        soWhatButton.querySelector("small");

      if (small) {
        small.textContent = "帰結を確認しました";
      }

    }


    checkAxisComplete();

  });

}


/* =====================================
   COMPLETE CHECK
===================================== */

function checkAxisComplete() {

  if (
    currentWhyStep === 2 &&
    currentSoWhatStep === 2
  ) {

    setTimeout(function () {

      axisComplete.classList.add("visible");

    }, 500);

  }

}

/* =====================================
   POST 05 / LOGIC REBUILD
===================================== */

const rebuildButton =
  document.getElementById("rebuildButton");

const rebuildButtonText =
  document.getElementById("rebuildButtonText");

const rebuildStatus =
  document.getElementById("rebuildStatus");

const missingLogic =
  document.getElementById("missingLogic");

const rebuildSteps =
  document.querySelectorAll(".rebuild-step");

const rebuildFinalLine =
  document.getElementById("rebuildFinalLine");

const rebuildComplete =
  document.getElementById("rebuildComplete");

const rebuildAction =
  document.querySelector(".rebuild-action");

const resultIcon =
  document.getElementById("resultIcon");

const resultMeta =
  document.getElementById("resultMeta");


let rebuildStep = 0;


if (rebuildButton) {

  rebuildButton.addEventListener(
    "click",
    function () {

      /* 完成済みなら何もしない */
      if (rebuildStep >= rebuildSteps.length) {
        return;
      }


      /* 最初のクリックで「？」を消す */
      if (rebuildStep === 0 && missingLogic) {

        missingLogic.classList.add("hidden");

      }


      /* 対象ステップを表示 */
      const targetStep =
        rebuildSteps[rebuildStep];

      if (targetStep) {

        /*
          「？」が縮んでから
          新しいカードを出す
        */

        setTimeout(
          function () {

            targetStep.classList.add("visible");

          },
          rebuildStep === 0 ? 400 : 0
        );

      }


      rebuildStep++;


      /* ステータス更新 */
      if (rebuildStatus) {

        rebuildStatus.textContent =
          `LOGIC ${rebuildStep} / ${rebuildSteps.length}`;

      }


      /* ボタン文言 */
      if (
        rebuildStep <
        rebuildSteps.length
      ) {

        rebuildButtonText.textContent =
          "次の論理をつなぐ";

      }


      /* =================================
         COMPLETE
      ================================= */

      if (
        rebuildStep ===
        rebuildSteps.length
      ) {

        rebuildButtonText.textContent =
          "LOGIC CONNECTED";

        rebuildButton.classList.add(
          "complete"
        );


        /*
          最後のカードが出てから
          ACTIONまで線を伸ばす
        */

        setTimeout(
          function () {

            if (rebuildFinalLine) {
              rebuildFinalLine.classList.add(
                "visible"
              );
            }

          },
          650
        );


        /*
          ACTIONを点灯
        */

        setTimeout(
          function () {

            if (rebuildAction) {
              rebuildAction.classList.add(
                "connected"
              );
            }

          },
          1050
        );


        /*
          ヘッダーも完成状態へ
        */

        setTimeout(
          function () {

            if (resultIcon) {
              resultIcon.classList.add(
                "logic-complete"
              );
            }

            if (resultMeta) {
              resultMeta.textContent =
                "LOGIC CONNECTED ✓";
            }

          },
          1400
        );


        /*
          最終メッセージ
        */

        setTimeout(
          function () {

            if (rebuildComplete) {
              rebuildComplete.classList.add(
                "visible"
              );
            }

          },
          1750
        );

      }

    }
  );

}

/* =====================================
   INSTAGRAM LINE SHINE
===================================== */

const instaShineLines =
  document.querySelectorAll(
    ".insta-shine-line"
  );


function playInstagramShine() {

  instaShineLines.forEach(
    function (line, index) {

      /*
        上の短いライン
        ↓
        INTUITION → LOGIC

        と少しだけタイミングをずらす。
      */

      setTimeout(
        function () {

          line.classList.remove("shine");


          /*
            同じclassを連続で付け直しても
            animationが再実行されない場合があるので
            reflowを発生させる
          */

          void line.offsetWidth;


          line.classList.add("shine");


          /*
            animation終了後にclassを戻す
          */

          setTimeout(
            function () {

              line.classList.remove(
                "shine"
              );

            },
            800
          );

        },
        index * 180
      );

    }
  );

}


/* 最初も一度光らせる */

setTimeout(
  playInstagramShine,
  800
);


/* 約2秒おきにｷﾗﾝｯ */

setInterval(
  playInstagramShine,
  2000
);

/* =====================================
   POST 00 / INTRO
===================================== */

const introThinkingTrigger =
  document.getElementById("introThinkingTrigger");

const introHiddenThinking =
  document.getElementById("introHiddenThinking");


if (introThinkingTrigger && introHiddenThinking) {

  introThinkingTrigger.addEventListener(
    "click",
    function () {

      const isOpen =
        introHiddenThinking.classList.toggle("open");

      introThinkingTrigger.classList.toggle(
        "active",
        isOpen
      );

      introThinkingTrigger.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      const label =
        introThinkingTrigger.querySelector("small");

      if (label) {
        label.textContent =
          isOpen
            ? "思考をとじる"
            : "思考をひらく";
      }

    }
  );

}

/* =====================================
   PROFILE / FOLLOW + SPARKLE
===================================== */

const followButton =
  document.getElementById("followButton");

if (followButton) {

  followButton.addEventListener(
    "click",
    function () {

      const isFollowing =
        followButton.classList.toggle("following");

      followButton.textContent =
        isFollowing
          ? "フォロー中"
          : "フォローする";


      /* フォローした瞬間だけキラキラ */
      if (isFollowing) {
        createFollowSparkles(followButton);
      }

    }
  );

}


function createFollowSparkles(button) {

  const colors = [
    "#feda75",
    "#fa7e1e",
    "#d62976",
    "#962fbf",
    "#4f5bd5",
    "#ffffff"
  ];

  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {

    const particle =
      document.createElement("span");

    particle.classList.add("follow-sparkle");

    /* 円周方向へ散らす */
    const angle =
      (Math.PI * 2 * i) / particleCount;

    const distance =
      35 + Math.random() * 35;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;

    particle.style.setProperty(
      "--spark-x",
      `${x}px`
    );

    particle.style.setProperty(
      "--spark-y",
      `${y}px`
    );

    particle.style.background =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];

    /* 粒サイズにも少しばらつき */
    const size =
      4 + Math.random() * 5;

    particle.style.width =
      `${size}px`;

    particle.style.height =
      `${size}px`;

    button.appendChild(particle);


    /* animation終了後に削除 */
    particle.addEventListener(
      "animationend",
      function () {
        particle.remove();
      }
    );

  }

}

/* =====================================
   POST 05 / CONTEXT FLOW DETAIL
===================================== */

const contextToggle =
  document.getElementById("contextToggle");

const contextDetail =
  document.getElementById("contextDetail");

if (contextToggle && contextDetail) {
  contextToggle.addEventListener("click", function () {
    const isOpen = contextDetail.classList.toggle("open");

    contextToggle.classList.toggle("active", isOpen);
    contextToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    const label = contextToggle.querySelector("span");
    if (label) {
      label.textContent = isOpen
        ? "流入条件をとじる"
        : "流入条件を見る";
    }
  });
}


/* =====================================
   POST 00 / ASSOCIATION THINKING
===================================== */

const associationSeeds =
  document.querySelectorAll(".association-seed");

const associationStage =
  document.getElementById("associationStage");

const associationPlaceholder =
  document.getElementById("associationPlaceholder");

const associationStatus =
  document.getElementById("associationStatus");

const associationOutput =
  document.getElementById("associationOutput");


/* =====================================
   WORD DATA
===================================== */

const associationWords = {

  chiikawa: [
    "ハチワレ",
    "うさぎ",
    "くりまんじゅう",
    "ラッコ",
    "シーサー",
    "モモンガ",
    "古本屋",
    "ポシェットの鎧さん"
  ],

  movie: [
    "劇中歌",
    "今日の日はさようなら",
    "物語の終わり",
    "別れ",
    "余韻",
    "エンドロール"
  ],

  feeling: [
    "さみしい",
    "つらい",
    "大切",
    "愛着",
    "失う",
    "離れたくない",
    "いつか終わる",
    "苦しい"
  ]

};


const expandedGroups = new Set();


/* =====================================
   SHUFFLE
===================================== */

function shuffleArray(array) {

  const copied = [...array];

  for (
    let i = copied.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(Math.random() * (i + 1));

    [
      copied[i],
      copied[j]
    ] = [
      copied[j],
      copied[i]
    ];

  }

  return copied;

}


/* =====================================
   CREATE WORD
===================================== */

function createAssociationWord(
  word,
  group,
  index
) {

  const element =
    document.createElement("span");

  element.classList.add(
    "association-word"
  );

  element.dataset.group = group;

  element.textContent = word;


  /* 光らせたい単語なら class追加 */
  if (keyAssociationWords.has(word)) {
    element.classList.add("association-word--key");
  }


  /* 少しだけ位置をズラす */
  const shiftX =
    Math.round(
      Math.random() * 12 - 6
    );

  const shiftY =
    Math.round(
      Math.random() * 10 - 5
    );

  const rotate =
    (
      Math.random() * 8 - 4
    ).toFixed(1);


  element.style.setProperty(
    "--shift-x",
    `${shiftX}px`
  );

  element.style.setProperty(
    "--shift-y",
    `${shiftY}px`
  );

  element.style.setProperty(
    "--rotate",
    `${rotate}deg`
  );


  /* 出現タイミングも少しずらす */
  element.style.animationDelay =
    `${index * 70}ms`;


  return element;

}


/* =====================================
   EXPAND
===================================== */

associationSeeds.forEach(
  function (seed) {

    seed.addEventListener(
      "click",
      function () {

        const group =
          seed.dataset.group;


        /* すでに開いていたら何もしない */

        if (
          expandedGroups.has(group)
        ) {
          return;
        }


        expandedGroups.add(group);

        seed.classList.add("active");


        /* 最初のクリックで ... を消す */

        if (associationPlaceholder) {

          associationPlaceholder
            .classList
            .add("hidden");

        }


        /* ワードの順番をランダム化 */

        const words =
          shuffleArray(
            associationWords[group]
          );


        words.forEach(
          function (word, index) {

            const element =
              createAssociationWord(
                word,
                group,
                index
              );


            /* 少しずつ増えていく */

            setTimeout(
              function () {

                associationStage
                  .appendChild(element);

              },
              index * 55
            );

          }
        );


        /* STATUS */

        if (associationStatus) {

          associationStatus.textContent =
            `THOUGHTS ${expandedGroups.size} / 3`;

        }


        /* =================================
           ALL COMPLETE
        ================================= */

        if (
          expandedGroups.size === 3
        ) {

          /*
            最後のワードがある程度
            出終わってから結論を表示
          */

          setTimeout(
            function () {

              associationStage
                .classList
                .add("complete");


              if (associationOutput) {

                associationOutput
                  .classList
                  .add("visible");

                associationOutput
                  .setAttribute(
                    "aria-hidden",
                    "false"
                  );

              }


              if (associationStatus) {

                associationStatus.textContent =
                  "THOUGHTS → COMPRESSED";

              }

            },
            1050
          );

        }

      }
    );

  }
);

const keyAssociationWords = new Set([
  "物語の終わり",
  "今日の日はさようなら",
  "愛着",
  "大切",
  "離れたくない",
  "いつか終わる"
]);


/* =====================================
   FOLLOW / SHOW AFTER FULL JOURNEY
===================================== */

let hasReachedPageEnd = false;
let followRevealDone = false;


function checkFollowReveal() {

  if (!followButton) {
    return;
  }


  /* 現在位置 */

  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop;

  const viewportHeight =
    window.innerHeight;

  const documentHeight =
    document.documentElement.scrollHeight;


  /* =================================
     一度でも最後まで到達したか
  ================================= */

  const distanceFromBottom =
    documentHeight -
    (scrollTop + viewportHeight);

  if (distanceFromBottom < 150) {
    hasReachedPageEnd = true;
  }


  /* =================================
     最後まで見たあと、
     トップ付近へ帰ってきたら表示
  ================================= */

  if (
    hasReachedPageEnd &&
    !followRevealDone &&
    scrollTop < 180
  ) {

    followRevealDone = true;

    followButton.classList.add(
      "follow-ready"
    );

    followButton.setAttribute(
      "aria-hidden",
      "false"
    );

  }

}


window.addEventListener(
  "scroll",
  checkFollowReveal,
  { passive: true }
);


/* 念のため初回も確認 */

checkFollowReveal();

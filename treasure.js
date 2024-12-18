// 模拟宝藏地图API
class TreasureMap {
  // 获取初始线索
    static getInitialClue() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("在古老的图书馆里找到了神秘人线索...");
        }, 1000);
      });
    }
  
   // 寻找神秘人
   static meetMysteriousPerson(clue1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue1) {
          reject("无功而返!");
      }
          resolve("神秘人: 我知道宝藏的位置，但你需要帮助我完成一个任务...");
      }, 1500);
    });
  }
  
    // 完成神秘人的任务
    static helpMysteriousPerson() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("神秘人: 谢谢你的帮助，我这里有宝藏的线索...");
          
        }, 2000);
      });
    }

    // 解码古老的线索
    static decodeAncientScript(clue2) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!clue2) {
            reject("没有线索可以解码!");
          }
          resolve("解码成功!宝藏在一座古老的神庙中...");
        }, 1500);
      });
    }
  
    // 寻找神庙
    static searchTemple() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.5) {
            reject("糟糕!遇到了神庙守卫!");
          }
          resolve("找到了一个神秘的箱子...");
        }, 2000);
      });
    }
  
    // 打开宝藏箱
    static openTreasureBox() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("恭喜!你找到了传说中的宝藏!");
        }, 1000);
      });
    }
  }
  /*
   使用Promise链执行寻找宝藏的四个步骤
  function findTreasureWithPromises() {
    TreasureMap.getInitialClue()
      .then(clue => {
        console.log(clue);
        return TreasureMap.decodeAncientScript(clue);
      })
      .then(location => {
        console.log(location);
        return TreasureMap.searchTemple(location);
      })
      .then(box => {
        console.log(box);
        return TreasureMap.openTreasureBox();
      })
      .then(treasure => {
        console.log(treasure);
      })
      .catch(error => {
        console.error("任务失败:", error);
      });
  }
      findTreasureWithPromises()
  */
// 播放背景音乐
function playBackgroundMusic() {
  const music = document.getElementById('background-music');
  music.play();
}
// 在游戏开始时播放音乐
document.getElementById('start-btn').addEventListener('click', function() {
  playBackgroundMusic();
  findTreasureWithAsyncAwait();
  this.style.display = 'none'; // 隐藏按钮
});


// 存储玩家信息
function savePlayerInfo(playerInfo) {
  const playerInfoJSON = JSON.stringify(playerInfo);
  localStorage.setItem('playerInfo', playerInfoJSON);
}

// 恢复玩家信息
function loadPlayerInfo() {
  const playerInfoJSON = localStorage.getItem('playerInfo');
  return playerInfoJSON ? JSON.parse(playerInfoJSON) : null;
}

// 更新游戏历史
function updateGameHistory(playerInfo, newScore) {
  playerInfo.gameHistory.push({
    date: new Date().toISOString().split('T')[0], // 获取当前日期
    score: newScore
  });
  savePlayerInfo(playerInfo); // 更新存储的信息
}
      async function loadAndDisplayText(filename, elementId) {
        try {
          const response = await fetch(filename);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const text = await response.text();
          document.getElementById(elementId).innerText = text;
        } catch (error) {
          console.error('Could not load the text file:', error);
        }
      }

      async function findTreasureWithAsyncAwait() {
        try {
          const playerInfo = loadPlayerInfo() || { playerId: 'new', nickname: '新玩家', gameHistory: [] };
          // 获取初始线索
          await loadAndDisplayText('library.txt', 'library-info');
          const clue1 = await TreasureMap.getInitialClue();
          document.getElementById('step-info').innerText = clue1;
          await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒刷新页面
      
          // 寻找神秘人
          await TreasureMap.meetMysteriousPerson(clue1);
          document.getElementById('step-info').innerText = "神秘人: 我知道宝藏的位置，但你需要帮助我完成一个任务...";
          await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒刷新页面
      
          // 完成神秘人的任务
          const message = await TreasureMap.helpMysteriousPerson();
          document.getElementById('step-info').innerText = message;
          await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒刷新页面
      
          // 解码古老的线索
          const clue2 = "神秘人给的线索"; // 这里假设神秘人给的线索是 "神秘人给的线索"
          const location = await TreasureMap.decodeAncientScript(clue2);
          document.getElementById('step-info').innerText = location;
          await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒刷新页面
      
          // 寻找神庙
          await loadAndDisplayText('temple.txt', 'temple-info');
          document.getElementById('library-info').style.display = 'none';
          await TreasureMap.searchTemple(location);
          document.getElementById('step-info').innerText = "找到了一个神秘的箱子...";
          await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒刷新页面
      
          // 打开宝藏箱
          const treasure = await TreasureMap.openTreasureBox();
          document.getElementById('step-info').innerText = treasure;
          const treasureImg = document.getElementById('treasure-img');
          treasureImg.style.display = 'block';
          treasureImg.style.opacity = 0;
          setTimeout(() => {
            treasureImg.style.opacity = 1;
          }, 100); // 等待100毫秒后开始动画
          const newScore = 300; // 这里应该是根据游戏结果计算出的分数
          updateGameHistory(playerInfo, newScore);
        } catch (error) {
          document.getElementById('step-info').innerText = error;
        }
      }
      

      // 开始寻宝动画
      document.getElementById('start-btn').addEventListener('click', function() {
        
        findTreasureWithAsyncAwait();
        this.style.display = 'none'; // 隐藏按钮
      });

 // 当页面加载时，尝试恢复玩家信息
document.addEventListener('DOMContentLoaded', () => {
  const playerInfo = loadPlayerInfo();
  if (playerInfo) {
    // 可以在这里更新页面上的元素，显示玩家信息
    console.log('玩家信息恢复成功:', playerInfo);
  } else {
    console.log('没有找到存储的玩家信息');
  }
});

  
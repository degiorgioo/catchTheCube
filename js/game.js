(function($){

    var posX, posY, randomX, randomY, scoreValue, timeInSeconds, time;
    var target, catcher, showTime ,showPosCatcherX, showPosCatcherY, showPosTargY, showPosTargX, showScoreValue;
    var actualInterval, moveInterval, updateTableInterval;
    var update, check, updateTime, finishGame, levelUp;


    $(document).ready(function(){
        console.log("game loaded");

        target = $("#target");
        catcher = $("#catcher");
        showPosCatcherX = $("#positionX");
        showPosCatcherY = $("#positionY");
        showPosTargX = $("#positionTargX");
        showPosTargY = $("#positionTargY");
        showScoreValue = $("#score");
        showTime = $("#time");
        time = 120000;
        timeInSeconds = Number((120000/1000)-1);
        posY = 0;
        posX = 0;
        moveInterval = 10;
        updateTableInterval = 10;
        scoreValue = 0;

        update = setInterval(updateTables, updateTableInterval);
        check = setInterval(checkIfCatched, 1);
        updateTime = setInterval(updateTimeTable, 1000);
        finishGame = setInterval(finishGameFunc, time);
        levelUp = setInterval(levelUpFunc, 1000);

        updateTimeTable();
        setCatcherPosition();
        setTargetPosition();

        $(document).keydown(function(e) {
            switch(e.which) {
                case 37:
                    clearInterval(actualInterval);
                    moveLeft();
                    break;
                case 38:
                    clearInterval(actualInterval);
                    moveUp();
                    break;
                case 39:
                    clearInterval(actualInterval);
                    moveRight();
                    break;
                case 40:
                    clearInterval(actualInterval);
                    moveDown();
                    break;
                case 32:
                    clearInterval(actualInterval);
                    console.log((posX+10 >= randomX && posX-10 <= randomX) && (posY+10 >= randomY && posY-10 <= randomY));
                    console.log("X: " + (posX+10 >= randomX && posX-10 <= randomX));
                    console.log("Y: " + (posY+30 >= randomY && posY-30 <= randomY));
                    console.log("Y+10 catcher: " + Number(posY+30));
                    console.log("Y-10 catcher: " + Number(posY-30));
                    console.log("X+10 catcher: " + Number(posX+10));
                    console.log("X-10 catcher: " + Number(posX-10));
                    console.log("Y target : " + Number(randomY));
                    console.log("X target : " + Number(randomX));
                    break;
            }
        });
    });

    var updateTables = function(){
        showPosCatcherX.text("Position X: " + posX);
        showPosCatcherY.text("Position Y: " + posY);
        showPosTargX.text("Position X: " + randomX);
        showPosTargY.text("Position Y: " + randomY);
        showScoreValue.text("Your score: " + scoreValue);
    };

    var setTargetPosition = function(){
        randomX = Math.floor((Math.random() * 600) + 50);
        randomY = Math.floor((Math.random() * 600) + 50);
        target.css("top", randomY);
        target.css("left",randomX);
    };

    var setCatcherPosition = function(){
        catcher.css("left", posX);
        catcher.css("top", posY);
    };

    var updateTimeTable = function(){
        showTime.text("Rest of time: " + timeInSeconds--);
    };

    var finishGameFunc = function(){
        clearInterval(update);
        clearInterval(check);
        clearInterval(updateTime);
        clearInterval(finishGame);
        clearInterval(actualInterval);
    };

    var levelUpFunc = function(){
      if(scoreValue >= 5){
          moveInterval = 8;
      }  else if(scoreValue >= 10 ){
          moveInterval = 5;
      } else if(scoreValue >= 15 ){
          moveInterval = 2;
      } else if(scoreValue >= 20 ){
          moveInterval = 1;
      }
    };

    var moveDown = function(){
        actualInterval = setInterval(function(){
            if(posY <= 680){
                catcher.css("top", posY++);
            }else{
                clearInterval(actualInterval);
            }
        }, moveInterval);
    };

    var moveUp = function(){
        actualInterval = setInterval(function(){
            if(posY > 0){
                catcher.css("top", posY--);
            }else{
                clearInterval(actualInterval);
            }
        }, moveInterval);
    };

    var moveRight = function(){
        actualInterval = setInterval(function(){
            if(posX <= 680){
                catcher.css("left", posX++);
            }else{
                clearInterval(actualInterval);
            }
        }, moveInterval);
    };

    var moveLeft = function(){
        actualInterval = setInterval(function(){
            if(posX > 0){
                catcher.css("left", posX--);
            }else{
                clearInterval(actualInterval);
            }
        }, moveInterval);
    };

    var checkIfCatched = function(){
        if((posX === randomX && posY=== randomY)||
            ((posX+10 >= randomX && posX-10 <= randomX) && (posY+30 >= randomY && posY-30 <= randomY))){
            scoreValue++;
            setTargetPosition();
      }
    };

})(jQuery);
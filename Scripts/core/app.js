/*
File Name:app.js
Author: Joseph Volpe
ID: 301118010
Site Name: null
File Description: Core code for slot machine app that runs on HTML
*/


(function () {
    // Function scoped Variables
    let stage;
    let assets;
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let jackPotLabel;
    let moneyLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    let replayButton;
    let quitButton;

    //label values
    let money = 750;
    let bet = 0;
    
     // Terrible code someone fix this.
    let winnings = 0;
    let jackpot = 10000;

    // symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    
   



    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
        { id: "Default", src: "./Assets/images/spinButton.png" },
        { id: "replayButton", src: "./Assets/images/replayButton.jpg" },
        { id: "quitButton", src: "./Assets/images/quitButton.png" },
        { id: "Handle", src: "./Assets/images/slotmachineHandle.jpg" },
        
    ];
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame
    function Update() {
        jackPotLabel.setText(jackpot)
        moneyLabel.setText(money)
        winningsLabel.setText(winnings)
        betLabel.setText(bet)
        stage.update();
    
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 19): 
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 20, 29): 
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 30, 37): 
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 38, 46): 
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 47, 54):
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 55, 59):
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 60, 62): 
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 63, 64):
                    betLine[spin] = "seven";
                    sevens++;
                    break;
                case checkRange(outCome[spin], 65, 65):
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        replayButton = new UIObjects.Button("replayButton", Config.Screen.CENTER_X + -280 , Config.Screen.CENTER_Y + -200, true);
        stage.addChild(replayButton);
        quitButton = new UIObjects.Button("quitButton", Config.Screen.CENTER_X + 280 , Config.Screen.CENTER_Y + -200, true);
        stage.addChild(quitButton);
        // Labels
        jackPotLabel = new UIObjects.Label(jackpot, "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        moneyLabel = new UIObjects.Label(money, "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(moneyLabel);
        winningsLabel = new UIObjects.Label(winnings, "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label(bet, "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("Default", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("Default", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("Default", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        slotmachineHandle = new Core.GameObject("Handle", Config.Screen.CENTER_X + 210, Config.Screen.CENTER_Y + 80, true);
        stage.addChild(slotmachineHandle);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
        
        
    }
    function interfaceLogic() {

        
        
        spinButton.on("click", () => {
            // reel test
            let reels = Reels();
            if(money >= bet)
            {
                 // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                money = money-bet;
                if(reels[0] && reels[1] && reels[2] == "seven")
                {
                    money = money+jackpot;
                    jackpot = "WINNER";
                }
            }
           
            
        });

        bet1Button.on("click", () => {
          
            bet++;

        });
        bet10Button.on("click", () => {

            bet = bet+10;

        });
        bet100Button.on("click", () => {
    
            bet = bet+100;

        });
        betMaxButton.on("click", () => {

            bet = bet+money;

        });
        replayButton.on("click", () => {
            /*money = 750;
            bet = 0;
            winnings = 0;
            jackpot = 10000;*/
          
            money = money;
            bet = 0;
            winnings = winnings;
            jackpot = jackpot;

        });
        quitButton.on("click", () => {
            close();
        });

    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map
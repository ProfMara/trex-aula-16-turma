var soloSprite, soloImagem;
//é aqui que cria a variável
var trex, trexAnimacao;
var solo;
var nuvemImagem;

//criar as variáveis
var o1, o2, o3, o4, o5, o6;
//criar a variável PLAY
var PLAY = 1;
//criar a variável END
var END = 0;
//criar a variável gameState
var gameState = PLAY;
//criar a variável do grupo de cactos
var grupoCacto;
//criar a variável do grupo de nuvens

//criar as variáveis para as imagens gameOver e restart

//criar as variáveis para as sprites gameOver e restart


function preload() {
    //é assim que carrega a animação
    trexAnimacao = loadAnimation("trex1.png","trex2.png","trex3.png");
    //carregando a animação do trex colidido..,

    
    soloImagem = loadImage("solo.png");
    nuvemImagem = loadImage("nuvem.png");
    //carregar as imagens dos obstáculos
    o1 = loadImage("obs1.png");
    o2 = loadImage("obs2.png");
    o3 = loadImage("obs3.png");
    o4 = loadImage("obs4.png");
    o5 = loadImage("obs5.png");
    o6 = loadImage("obs6.png");
    //carregando as imagens restart e gameOver...



}


function setup() {
    createCanvas(600, 200);
    //é aqui que cria as sprites
    //solo
    solo = createSprite(300,180,600, 20);
    solo.addImage(soloImagem);
    solo.velocityX = -3;

    //solo invisível
    soloInvisivel = createSprite(300,195,600,20);
    soloInvisivel.visible = false;

    //trex 
    trex = createSprite(50,170,50,50);
    //adiciona a animação dele correndo
    trex.addAnimation("correndo",trexAnimacao);
    //adicionando a animação do trex colidido..

    trex.scale=0.5;

    //criando a sprite restart...


    //criando a sprite gameOver... 
    
    

    //criar o grupo do cacto
    grupoCacto = new Group();
    //criar o grupo da nuvem

}


function draw() {
    //pinta o fundo de uma cor
    background("white");

    //checar se gameState é PLAY
    if(gameState == PLAY){
        criarCactos();
        //chama a função que cria as nuvens
        criarNuvens();
        //verifica se a pessoa apertou a tecla espaço
        if(keyDown("space") && trex.isTouching(solo) ){
            //dá velocidade para o trex voar
            trex.velocityY = -10;
        }

        //checa se o solo saiu da tela
        if(solo.x < 0){
            //se sim, ele volta para a metade do jogo 
            //e cria um loop infinito
            solo.x = width/2;
        }

        //checar se o trex está tocando no grupo de cacto
        if(trex.isTouching(grupoCacto)){
            gameState = END;
        }
    }
    
    //checar se gameState é END
    if(gameState == END){
        solo.velocityX = 0;
        //paralisar as nuvens

        //paralisar os cactos

        //paralisar o trex

        //não deixar o cactos desaparecerem

        //não deixar as nuvens desaparecerem

    }
    //esse código dá gravidade para o trex cair
    trex.velocityY += 0.8;
    //manda o trex colidir com o solo
    trex.collide(soloInvisivel);
    //desenha as sprites
    drawSprites();
}
//cria a função criarNuvens
function criarNuvens(){
    //determina o que ocorre a cada 90 quadros
    if(frameCount % 90 == 0){
        //cria a sprite da nuvem em uma posição Y aleatória
        var nuvem = createSprite(600,Math.round(random(70,150)),75,20);
        //adiciona a imagem
        nuvem.addImage(nuvemImagem);        
        //define velocidade
        nuvem.velocityX = -3;
        //define o tamanho
        nuvem.scale = 0.5;
        trex.depth = nuvem.depth + 1;
        nuvem.lifetime = 200;
        //adicionar as nuvens no grupo de nuvens

    }
}

function criarCactos(){
    if(frameCount % 60 == 0){
        var cacto = createSprite(600,170,50,50);
        var a = Math.round(random(1,6));
        switch(a){
            case 1: cacto.addImage(o1);
            break;
            case 2: cacto.addImage(o2);
            break;
            case 3: cacto.addImage(o3);
            break;
            case 4: cacto.addImage(o4);
            break;
            case 5: cacto.addImage(o5);
            break;
            case 6: cacto.addImage(o6);
            break;
        }
        cacto.velocityX = -3;
        cacto.scale = 0.5;
        cacto.lifetime = 200;
        //adicionar os cactos no grupo de cactos
        grupoCacto.add(cacto);
    }
}
let player = 2

let bulletX = 0
let bulletY = 0
let bulletActive = false

let enemyX = randint(0, 4)
let enemyY = 0

let score = 0

let enemyTimer = 0
let enemySpeed = 4

let gameStarted = false

// UFO
let ufoX = 0
let ufoActive = false
let ufoDir = 1

// BOSS
let bossX = 2
let bossY = 0
let bossActive = false
let bossTeleport = 0
let bossVulnerable = false

let bossBulletX = 0
let bossBulletY = 0
let bossBulletActive = false

basic.forever(function () {

    if (!gameStarted) return

    basic.clearScreen()

    led.plot(player, 4)

    // tiro
    if (bulletActive) {

        led.plot(bulletX, bulletY)

        bulletY += -1

        if (bulletY < 0) bulletActive = false
    }

    // ativar boss
    if (score >= 100 && !bossActive) {

        basic.showString("BOSS")

        bossActive = true
        bossTeleport = 0
    }

    // inimigo
    if (!bossActive) {

        enemyTimer += 1

        if (enemyTimer >= enemySpeed) {

            enemyY += 1
            enemyTimer = 0
        }

        led.plot(enemyX, enemyY)

        if (bulletActive && bulletX == enemyX && bulletY == enemyY) {

            score += 1

            enemyX = randint(0, 4)
            enemyY = 0

            bulletActive = false
        }

        if (enemyY == 4 && enemyX == player) {

            basic.showString("END")
            basic.showNumber(score)

            control.reset()
        }

        if (enemyY > 4) {

            enemyX = randint(0, 4)
            enemyY = 0
        }
    }

    // UFO raro
    if (!ufoActive && randint(0, 100) == 0) {

        ufoActive = true
        ufoX = 0
        ufoDir = 1
    }

    if (ufoActive) {

        led.plot(ufoX, 0)

        ufoX += ufoDir

        if (bulletActive && bulletX == ufoX && bulletY == 0) {

            score += 20

            bulletActive = false
            ufoActive = false
        }

        if (ufoX > 4) ufoActive = false
    }

    // BOSS
    if (bossActive) {

        led.plot(bossX, bossY)

        if (randint(0, 10) == 0 && bossTeleport < 3) {

            bossX = randint(0, 4)
            bossTeleport += 1
        }

        if (bossTeleport >= 3) bossVulnerable = true

        if (!bossBulletActive && randint(0, 4) == 0) {

            bossBulletActive = true
            bossBulletX = bossX
            bossBulletY = bossY
        }

        if (bossBulletActive) {

            led.plot(bossBulletX, bossBulletY)

            bossBulletY += 1

            if (bossBulletY == 4 && bossBulletX == player) {

                basic.showString("END")
                basic.showNumber(score)

                control.reset()
            }

            if (bossBulletY > 4) bossBulletActive = false
        }

        if (bossVulnerable && bulletActive && bulletX == bossX && bulletY == bossY) {

            basic.showString("WIN")

            score += 50

            bossActive = false
        }
    }

    basic.pause(60)

})

// CONTROLES
input.onButtonPressed(Button.A, function () {

    if (!gameStarted) return

    player += -1
    if (player < 0) player = 0
})

input.onButtonPressed(Button.B, function () {

    if (!gameStarted) return

    player += 1
    if (player > 4) player = 4
})

input.onButtonPressed(Button.AB, function () {

    if (!gameStarted) {

        gameStarted = true
        score = 0
        return
    }

    if (!bulletActive) {

        bulletActive = true
        bulletX = player
        bulletY = 3
    }
})
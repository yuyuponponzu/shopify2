import { check } from 'prettier';

// 基本的に変数は全てグローバル管理する。（draw内で時々刻々と変化させるものが多いから）
export const sketch = (p) => {
    // upcount用カウンター
    let counter = 0;
    // カウントアップ時の乱数
    let up_count = 0;
    // downcount用カウンター
    let down_large_count;
    let down_small_count;
    let down_level = 10;
    // 上側大きい円のx座標
    let top_circle_posx;
    // 上側大きい円のy座標
    let top_circle_posy;
    // 中央大きい円のx座標
    let center_circle_posx;
    // 中央大きい円のy座標
    let center_circle_posy;
    // 下側大きい円のx座標
    let bottom_circle_posx;
    // 下側大きい円のy座標
    let bottom_circle_posy;
    // 小さい円（upcount円）のx座標
    let counter_posx;
    // 小さい円（upcount円）のy座標
    let counter_posy;
    // 大きい円の直径
    let large_circle_radius;
    // 小さい円（upcount円）の直径
    let small_circle_radius;
    // 大きい円の色
    let large_circle_color;
    // カート開いてる時は表示しない
    let cartStatus = false;
    // click判定
    let clickStatus = false;
    // クリック後時間経過判定用カウンター
    let click_time_counter = 100;
    // itoneアニメーション用変数
    let down_color_itone = 255;
    // let itone_posx;
    let check_drop_status = 0;
    let itone_g_minus = 10;
    let before_nexty = 500000000;
    let temp_x;
    let break_animation;
    let nexty;
    let itone_g = 1;
    let circle_g = 1;
    let itone_rotate = [0, 0, 0, 0, 0];
    // const itone_strings = ["i", "　t", "　　o", "　　　n", "　　　　e"];
    const itone_strings = ['i'];
    // モーダルアニメーション用変数
    let slide_outer_modal;
    let slide_outer_modal_g = 1;
    let slide_inner_modal;
    let slide_inner_modal_g = 1;
    let draw_modal_counter = 0;
    let slide_inner_modal_text;

    p.preload = () => {};

    p.setup = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight - 60);
        slide_outer_modal = p.width;
        slide_inner_modal = p.width;
        slide_inner_modal_text = p.width;
        large_circle_radius = p.height / 3;
        small_circle_radius = p.height / 6;
        large_circle_color = 20;
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight - 60);
        slide_outer_modal = p.width;
        slide_inner_modal = p.width;
        slide_inner_modal_text = p.width;
        large_circle_radius = p.height / 3;
        small_circle_radius = p.height / 6;
        large_circle_color = 20;
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (props.cartStatus || (!props.cartStatus && cartStatus)) cartStatus = props.cartStatus;
    };

    // Clickの判定処理
    p.mouseClicked = () => {
        // 最初のclickヒット判定
        // TO DO：ヒットボックスが厳密じゃなくて、四角でとるようになっているから、斜め方向に若干のズレがある。厳密にやるなら円形にとる必要あり。
        if (clickStatus === false) {
            if (
                p.mouseX >= counter_posx - small_circle_radius / 2 &&
                counter_posx + small_circle_radius / 2 >= p.mouseX
            ) {
                if (
                    p.mouseY >= counter_posy - small_circle_radius / 2 &&
                    counter_posy + small_circle_radius / 2 >= p.mouseY
                ) {
                    clickStatus = true;
                    down_large_count = large_circle_radius;
                    down_small_count = small_circle_radius;
                }
            }
        }
        // モーダル内リンク遷移判定
        if (break_animation && draw_modal_counter > 15) {
            // x軸判定
            if (
                p.mouseX >= p.width - p.width * 0.3 - p.width * 0.1 &&
                p.width - p.width * 0.3 + p.width * 0.1 >= p.mouseX
            ) {
                // y軸判定
                // ここでリンク先を識別
                // 一番上はused
                if (
                    p.mouseY >= p.height * 0.3 - p.height * 0.03 &&
                    p.height * 0.3 + p.height * 0.03 >= p.mouseY
                ) {
                    console.log('used');
                } else if (
                    p.mouseY >= p.height * 0.5 - p.height * 0.03 &&
                    p.height * 0.5 + p.height * 0.03 >= p.mouseY
                ) {
                    console.log('select');
                } else if (
                    p.mouseY >= p.height * 0.7 - p.height * 0.03 &&
                    p.height * 0.7 + p.height * 0.03 >= p.mouseY
                ) {
                    console.log('original');
                }
            }
        }
    };

    const drawLargeCircle = () => {
        // 上側の半透明円
        top_circle_posx = p.width - large_circle_radius / 2 - p.width / 80; //最後の項は端にくっつかないように調整してる
        top_circle_posy = p.height / 4;
        // 動画を貼り付けたかったけど、webGLモード（3D object）にしか貼り付けられないっぽい。
        p.strokeWeight(1);
        // p.stroke(`rgba(${large_circle_color+Math.round(p.random(-large_circle_color,0))}, ${large_circle_color+Math.round(p.random(-large_circle_color,0))}, ${large_circle_color+Math.round(p.random(-large_circle_color,40))}, 0.85)`);
        p.fill(
            `rgba(${large_circle_color + Math.round(p.random(-large_circle_color, 0))}, ${
                large_circle_color + Math.round(p.random(-large_circle_color, 0))
            }, ${large_circle_color + Math.round(p.random(-large_circle_color, 0))}, ${
                0.2 + Math.round(p.random(0, 0.15))
            })`,
        );
        p.stroke(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.95)`);
        // p.fill(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.85)`);
        p.arc(
            top_circle_posx,
            top_circle_posy,
            large_circle_radius,
            large_circle_radius,
            p.radians(0),
            p.radians(360),
            p.PIE,
        );

        // 真ん中の半透明円
        center_circle_posx = p.width - large_circle_radius / 2 - p.width / 80;
        center_circle_posy = p.height / 2;
        p.strokeWeight(1);
        p.stroke(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.45)`);
        p.fill(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.45)`);
        p.arc(
            center_circle_posx,
            center_circle_posy,
            large_circle_radius,
            large_circle_radius,
            p.radians(0),
            p.radians(360),
            p.PIE,
        );

        // 下側の半透明円
        bottom_circle_posx = p.width - large_circle_radius / 2 - p.width / 80;
        bottom_circle_posy = p.height - p.height / 4;
        // p.stroke(`rgba(${large_circle_color+Math.round(p.random(-large_circle_color,0))}, ${large_circle_color+Math.round(p.random(-large_circle_color,0))}, ${large_circle_color+Math.round(p.random(-large_circle_color,40))}, 0)`);
        p.fill(
            `rgba(${large_circle_color + Math.round(p.random(-large_circle_color, 0))}, ${
                large_circle_color + Math.round(p.random(-large_circle_color, 0))
            }, ${large_circle_color + Math.round(p.random(-large_circle_color, 0))}, ${
                0.2 + Math.round(p.random(0, 0.15))
            })`,
        );
        p.stroke(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.95)`);
        // p.fill(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.85)`);
        p.arc(
            bottom_circle_posx,
            bottom_circle_posy,
            large_circle_radius,
            large_circle_radius,
            p.radians(0),
            p.radians(360),
            p.PIE,
        );
    };

    const drawUpCounter = () => {
        counter_posx = p.width - large_circle_radius / 2 - p.width / 80;
        counter_posy = p.height / 2;
        // itone_posx = [counter_posx, counter_posx, counter_posx, counter_posx, counter_posx];
        temp_x = counter_posx;
        itone_rotate = [0, 0, 0, 0, 0];
        nexty = Math.round(counter_posy);
        up_count = 4 + p.random(-4, 4);
        counter = counter + up_count > 360 ? 360 : counter + up_count;

        p.stroke('rgba(255, 255, 255, 1)');
        p.fill('rgba(255, 255, 255, 1)');
        p.textSize(small_circle_radius / 8);
        p.text(
            Math.round(counter / 3.6) + '%',
            counter_posx + small_circle_radius / 10,
            counter_posy + small_circle_radius / 10,
            70,
            80,
        );

        p.strokeWeight(1);
        p.stroke('rgba(0, 0, 0, 0.65)');
        p.fill('rgba(0, 0, 0, 0.65)');
        // 引数説明：x,y,w,h,startする位置(度数),stopする位置(度数),mode
        p.arc(
            counter_posx,
            counter_posy,
            small_circle_radius,
            small_circle_radius,
            p.radians(0),
            p.radians(counter),
            p.PIE,
        );
    };

    const drawClickCircle = () => {
        counter_posx = p.width - large_circle_radius / 2 - p.width / 80;
        counter_posy = p.height / 2;
        p.strokeWeight(0.01);
        p.stroke('rgba(255, 255, 255, 1)');
        p.fill('rgba(255, 255, 255, 1)');
        p.textSize(small_circle_radius / 5);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('Lucida Bright');
        p.text('Click', counter_posx, counter_posy);

        p.strokeWeight(1);
        p.stroke('rgba(0, 0, 0, 0.65)');
        p.fill('rgba(0, 0, 0, 0.65)');
        p.arc(
            counter_posx,
            counter_posy,
            small_circle_radius,
            small_circle_radius,
            p.radians(0),
            p.radians(counter),
            p.PIE,
        );
    };

    const drawDisappearCircle = () => {
        circle_g *= 1.1;
        down_level += circle_g;
        down_large_count = down_large_count - down_level < 0 ? 0 : down_large_count - down_level;
        down_small_count =
            down_small_count - Math.round(down_level / 5) < 0
                ? 0
                : down_small_count - Math.round(down_level / 5);

        p.strokeWeight(1);
        top_circle_posx = p.width - large_circle_radius / 2 - p.width / 80; //最後の項は端にくっつかないように調整してる
        top_circle_posy = p.height / 4;
        p.fill(
            `rgba(${large_circle_color + Math.round(p.random(-large_circle_color, 0))}, ${
                large_circle_color + Math.round(p.random(-large_circle_color, 0))
            }, ${large_circle_color + Math.round(p.random(-large_circle_color, 0))}, ${
                0.2 + Math.round(p.random(0, 0.15))
            })`,
        );
        p.stroke(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.95)`);
        p.arc(
            top_circle_posx,
            top_circle_posy,
            down_large_count,
            down_large_count,
            p.radians(0),
            p.radians(360),
            p.PIE,
        );

        // 真ん中の半透明円
        p.strokeWeight(1);
        center_circle_posx = p.width - large_circle_radius / 2 - p.width / 80;
        center_circle_posy = p.height / 2;
        counter_posx = p.width - large_circle_radius / 2 - p.width / 80;
        counter_posy = p.height / 2;
        p.stroke(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.45)`);
        p.fill(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.45)`);
        p.arc(
            center_circle_posx,
            center_circle_posy,
            down_large_count,
            down_large_count,
            p.radians(0),
            p.radians(360),
            p.PIE,
        );

        // 下側の半透明円
        bottom_circle_posx = p.width - large_circle_radius / 2 - p.width / 80;
        bottom_circle_posy = p.height - p.height / 4;
        p.fill(
            `rgba(${large_circle_color + Math.round(p.random(-large_circle_color, 0))}, ${
                large_circle_color + Math.round(p.random(-large_circle_color, 0))
            }, ${large_circle_color + Math.round(p.random(-large_circle_color, 0))}, ${
                0.2 + Math.round(p.random(0, 0.15))
            })`,
        );
        p.stroke(`rgba(${large_circle_color}, ${large_circle_color}, ${large_circle_color}, 0.95)`);
        p.arc(
            bottom_circle_posx,
            bottom_circle_posy,
            down_large_count,
            down_large_count,
            p.radians(0),
            p.radians(360),
            p.PIE,
        );

        // 真ん中の小さい円消滅
        p.strokeWeight(1);
        p.stroke('rgba(0, 0, 0, 0.65)');
        p.fill('rgba(0, 0, 0, 0.65)');
        p.arc(
            counter_posx,
            counter_posy,
            down_small_count,
            down_small_count,
            p.radians(0),
            p.radians(counter),
            p.PIE,
        );

        // itone表示
        if (down_small_count === 0 && click_time_counter >= 0) {
            click_time_counter -= 1;
            down_color_itone -= 1;
            p.strokeWeight(0.01);
            p.stroke(`rgba(255, 255, ${down_color_itone}, 1)`);
            p.fill(`rgba(255, 255, ${down_color_itone}, 1)`);
            p.textSize(small_circle_radius / 7);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont('Lucida Bright');
            p.text('itone', counter_posx + 10, counter_posy);
        }
    };

    const drawDropItoneAnimation = () => {
        // animation計算
        // 殴りがいたから訳わからんくなって自信ないけどなんか動いてる
        if (nexty + 5 <= p.height) {
            itone_g *= 1.1;
            nexty += itone_g;
            if (temp_x >= p.width) {
                break_animation = true;
            } else if (check_drop_status !== 1 && nexty + 5 > p.height) {
                check_drop_status += 1;
                itone_strings.forEach((s, ind) => {
                    // let rand = p.random(-2,2);
                    // if (itone_posx[ind] + rand < 0){
                    //     itone_posx[ind] += 1;
                    // } else if (itone_posx[ind] + rand > p.width){
                    //     itone_posx[ind] -= 1;
                    // } else{
                    //     itone_posx[ind] += rand;
                    // }
                    itone_rotate[ind] += p.random(-5, 5);
                    drawDropText(s, counter_posx, nexty, itone_rotate[ind]);
                });
                // console.log("bbb");
            } else {
                itone_strings.forEach((s, ind) => {
                    // let rand = p.random(-2,2);
                    // if (itone_posx[ind] + rand < 0){
                    //     itone_posx[ind] += 1;
                    // } else if (itone_posx[ind] + rand > p.width){
                    //     itone_posx[ind] -= 1;
                    // } else{
                    //     itone_posx[ind] += rand;
                    // }
                    itone_rotate[ind] += p.random(-5, 5);
                    drawDropText(s, counter_posx, nexty, itone_rotate[ind]);
                });
                // console.log("ddd");
            }
        } else if (check_drop_status === 1 && nexty + 20 >= p.height) {
            // console.log("aaa");
            itone_g_minus *= 0.9;
            nexty -= itone_g_minus;
            if (Math.round(before_nexty) === Math.round(nexty)) {
                break_animation = true;
                return;
            }
            before_nexty = nexty;
            temp_x += 3;
            itone_strings.forEach((s, ind) => {
                itone_rotate[ind] += p.random(-5, 5);
                drawDropText(s, temp_x, nexty, itone_rotate[ind]);
            });
        } else if (check_drop_status === 1 && itone_g !== 1) {
            itone_g = 0.9;
        } else {
            return;
        }
    };

    const drawDropText = (s, x, y, rot) => {
        p.strokeWeight(0.01);
        p.stroke('rgba(255, 255, 200, 1)');
        p.fill('rgba(255, 255, 200, 1)');
        p.textSize(small_circle_radius / 7);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('Lucida Bright');
        p.translate(x, y);
        p.rotate(p.radians(rot));
        p.text(s, 0, 0);
    };

    const drawModal = () => {
        //外側の長方形
        p.fill(`rgba(50, 50, 50, 0.5)`);
        p.stroke(`rgba(50, 50, 50, 1)`);
        slide_outer_modal_g *= 1.2;
        slide_outer_modal -= slide_outer_modal_g;
        if (slide_outer_modal > p.width - p.width * 0.6) {
            p.rect(slide_outer_modal, 0, p.width * 0.6, p.height, 2);
        } else {
            p.rect(p.width - p.width * 0.6, 0, p.width * 0.6, p.height, 2);
        }

        //内側の長方形
        p.fill(`rgba(0, 0, 0, 1)`);
        p.stroke(`rgba(0, 0, 0, 1)`);
        slide_inner_modal_g *= 1.4;
        slide_inner_modal -= slide_inner_modal_g;
        if (slide_inner_modal > p.width - p.width * 0.7) {
            p.rect(slide_inner_modal, p.height * 0.05 + 5, p.width * 0.7, p.height * 0.9, 20);
        } else {
            p.rect(
                p.width - p.width * 0.65,
                p.height * 0.05 + 5,
                p.width * 0.7,
                p.height * 0.9,
                20,
            );
        }

        // menu 作る
        slide_inner_modal_text -= slide_inner_modal_g;
        if (slide_inner_modal_text > p.width - p.width * 0.3) {
            p.strokeWeight(0.01);
            p.stroke(`rgba(255, 255, 255, 1)`);
            p.fill(`rgba(255, 255, 255, 1)`);
            p.textSize(small_circle_radius / 7);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont('Lucida Bright');
            p.text('used clothing', slide_inner_modal_text, p.height * 0.3);

            p.strokeWeight(0.01);
            p.stroke(`rgba(255, 255, 255, 1)`);
            p.fill(`rgba(255, 255, 255, 1)`);
            p.textSize(small_circle_radius / 7);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont('Lucida Bright');
            p.text('select clothing', slide_inner_modal_text, p.height * 0.5);

            p.strokeWeight(0.01);
            p.stroke(`rgba(255, 255, 255, 1)`);
            p.fill(`rgba(255, 255, 255, 1)`);
            p.textSize(small_circle_radius / 7);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont('Lucida Bright');
            p.text('original clothing', slide_inner_modal_text, p.height * 0.7);
        } else {
            p.strokeWeight(0.01);
            p.stroke(`rgba(255, 255, 255, 1)`);
            p.fill(`rgba(255, 255, 255, 1)`);
            p.textSize(small_circle_radius / 7);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont('Lucida Bright');
            p.text('used clothing', p.width - p.width * 0.3, p.height * 0.3);

            p.strokeWeight(0.01);
            p.stroke(`rgba(255, 255, 255, 1)`);
            p.fill(`rgba(255, 255, 255, 1)`);
            p.textSize(small_circle_radius / 7);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont('Lucida Bright');
            p.text('select clothing', p.width - p.width * 0.3, p.height * 0.5);

            p.strokeWeight(0.01);
            p.stroke(`rgba(255, 255, 255, 1)`);
            p.fill(`rgba(255, 255, 255, 1)`);
            p.textSize(small_circle_radius / 7);
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont('Lucida Bright');
            p.text('original clothing', p.width - p.width * 0.3, p.height * 0.7);
        }
    };

    p.draw = () => {
        // カート表示してない時のみ表示する
        if (cartStatus === false) {
            p.background('rgba(30, 30, 30, 1)');

            if (break_animation) {
                draw_modal_counter += 1;
                if (draw_modal_counter > 15) {
                    drawModal();
                }
            }

            // upcount円の処理
            if (360 > counter) {
                drawLargeCircle();
                drawUpCounter();
            } else {
                if (!clickStatus) {
                    drawLargeCircle();
                    drawClickCircle();
                } else {
                    if (click_time_counter >= 0) {
                        drawDisappearCircle();
                    } else {
                        drawDropItoneAnimation();
                    }
                }
            }
        } else {
            return;
        }
    };
};

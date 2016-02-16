function win_dark = getT(input,path_res)
    figure('visible','off');
    patch_size = 15;
    r = 60;
    A = 0.8;
    eps = 10^-3;


    img = imread(input);
    [h,w,c] = size(img);
    I = double(img) / 255;
    w1  = 0.8;
    patch_size =patch ;img_size = w * h;
    win_dark = zeros(h,w);
    for i=1:h                
        for j=1:w
            win_dark(i,j)=min(I(i,j,:));
        end
    end

    % dark channel
    win_dark = ordfilt2(win_dark,1,ones(15,15),'symmetric');

    % rough transmission
    t0 = 0.1;
    transmission = 1 - 0.85 * win_dark/A;
    t = max(t0,transmission);

    % guided filter
    I1 = double(rgb2gray(img))/255;
    gt = guidedfilter(I1 ,t, r, eps);

    % result
    res = zeros(h,w,c);
    for i=1:c
        for j=1:h
            for l=1:w
                res(j,l,i)=(I(j,l,i)-A)/gt(j,l)+A;
            end
        end
    end
    imwrite(res,path_res);

    exit

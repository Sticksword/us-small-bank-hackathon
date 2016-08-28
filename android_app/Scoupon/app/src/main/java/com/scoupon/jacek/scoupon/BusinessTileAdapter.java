package com.scoupon.jacek.scoupon;

import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.GridView;
import android.widget.ImageView;

import java.util.ArrayList;

/**
 * Created by jacek on 27/08/16.
 */
public class BusinessTileAdapter extends BaseAdapter {

    private Context mContext;

    private ArrayList<Integer> images;

    public BusinessTileAdapter(Context c) {
        mContext = c;
        images = new ArrayList<>();
        images.add(R.drawable.b2);
        images.add(R.drawable.b4);
        images.add(R.drawable.b1);
        images.add(R.drawable.b5);
        images.add(R.drawable.b3);

    }

    @Override
    public int getCount() {
        return 5;
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ImageView imageView;
        if (convertView == null) {
            // if it's not recycled, initialize some attributes
            imageView = new ImageView(mContext);
            imageView.setLayoutParams(new GridView.LayoutParams(350, 350));
            imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
            imageView.setPadding(8, 8, 8, 8);
        } else {
            imageView = (ImageView) convertView;
        }

        imageView.setImageResource(images.get(position));
        imageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(mContext,  Main3Activity.class);
                mContext.startActivity(intent);
            }
        });
        return imageView;

    }
}

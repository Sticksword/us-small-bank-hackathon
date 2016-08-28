package com.scoupon.jacek.scoupon;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.zip.Inflater;

/**
 * Created by jacek on 27/08/16.
 */
public class CouponAdapter extends BaseAdapter {

    private Context context;
    private ArrayList<Integer> arrayList;
    private ArrayList<String> titleList;
    private ArrayList<String> descriptionList;

    public CouponAdapter(Context context, int version) {
        this.context = context;
        arrayList = new ArrayList();
        titleList = new ArrayList();
        descriptionList = new ArrayList();
        for (int i=0; i< (version == 1 ? 5 : 2); i++) {
            arrayList.add((version == 1 ? 1 : 2));
            //titleList.add("Title" + i);
            //descriptionList.add("Description" + i);
        }
        if (version == 1) {
            titleList.add("30% off");
            descriptionList.add("Brunch");
            titleList.add("$1 off");
            descriptionList.add("Your next coffee");
            titleList.add("20% off ");
            descriptionList.add("Your highest purchase");
            titleList.add("$2 off");
            descriptionList.add("Latte");
            titleList.add("15% off");
            descriptionList.add("your entire purchase");
        }else {
            titleList.add("30% off");
            descriptionList.add("Brunch");
            titleList.add("20% off ");
            descriptionList.add("Your highest purchase");
        }

    }

    @Override
    public int getCount() {
        return arrayList.size();
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
        LayoutInflater inflater = ((Activity)context).getLayoutInflater();
        View rootView = inflater.inflate(R.layout.coupon_layout, parent, false);
        final int finalpos = position;
        ((TextView)rootView.findViewById(R.id.textView)).setText(titleList.get(position));
        ((TextView)rootView.findViewById(R.id.textView4)).setText(descriptionList.get(position));
        rootView.findViewById(R.id.imageButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (arrayList.get(finalpos) == 1) {
                    v.setBackgroundResource(R.drawable.redeem);
                } else if (arrayList.get(finalpos) == 2) {
                    Intent intent = new Intent(context,  PayActivity.class);
                    context.startActivity(intent);
                    v.setBackgroundResource(R.drawable.ok);

                } else {

                }
                arrayList.set(finalpos, Math.min(arrayList.get(finalpos) + 1, 3));
            }
        });
        switch (arrayList.get(position)) {
            case 1:
                rootView.findViewById(R.id.imageButton).setBackgroundResource(R.drawable.plus);
                break;
            case 2:
                rootView.findViewById(R.id.imageButton).setBackgroundResource(R.drawable.redeem);
                break;
            case 3:
                rootView.findViewById(R.id.imageButton).setBackgroundResource(R.drawable.ok);
                break;
            default:
                rootView.findViewById(R.id.imageButton).setBackgroundResource(R.drawable.plus);
        }
        return rootView;
    }

}

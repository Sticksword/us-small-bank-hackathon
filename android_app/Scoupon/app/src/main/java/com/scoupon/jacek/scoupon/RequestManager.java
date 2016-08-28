package com.scoupon.jacek.scoupon;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by jacek on 28/08/16.
 */
public class RequestManager {

    private static RequestManager requestManager = new RequestManager();

    RequestQueue queue;
    Context context;

    private RequestManager() {

    }

    public void init(Context context) {
        this.context = context;
        queue = Volley.newRequestQueue(context);
        this.queue.start();
    }

    public static RequestManager getInstance() {
        return requestManager;
    }

    public void paymentRequest(String token) {

        JSONObject info = new JSONObject();
        try {
            info.put("simplifyToken", token);
        } catch (JSONException e) {
            e.printStackTrace();
        }


        final String URL = "http://8e9503f2.ngrok.io/api/payment/submitPayment";
        JsonObjectRequest req = new JsonObjectRequest(Request.Method.POST, URL, info,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Toast.makeText(context, "Success", Toast.LENGTH_SHORT).show();
                        Log.d("payment", "success");
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                VolleyLog.e("Error: ", error.getMessage());
            }
        });

        queue.add(req);

    }
}

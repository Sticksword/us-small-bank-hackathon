package com.scoupon.jacek.scoupon;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.simplify.android.sdk.CardEditor;
import com.simplify.android.sdk.CardToken;
import com.simplify.android.sdk.Simplify;

public class PayActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pay);
        pay();
    }

    private void pay() {
        // init card editor

        final Simplify simplify = new Simplify();

        simplify.setApiKey("sbpb_YWE1NDE2ZjYtZWJmMi00MmZlLTllMGYtOTcwZjk5NDhiODcy");

        final CardEditor cardEditor = (CardEditor) findViewById(R.id.card_editor);

        final Button checkoutButton = (Button) findViewById(R.id.button);

        // add state change listener

        cardEditor.addOnStateChangedListener(new CardEditor.OnStateChangedListener() {
            @Override
            public void onStateChange(CardEditor cardEditor) {

            }
        });

        // add checkout button click listener

        checkoutButton.setOnClickListener(new View.OnClickListener() {

            @Override

            public void onClick(View v) {

                // create a card token

                simplify.createCardToken(cardEditor.getCard(), new CardToken.Callback() {

                    @Override

                    public void onSuccess(CardToken cardToken) {

                        //Toast.makeText(getBaseContext(), "Success", Toast.LENGTH_SHORT).show();
                        //finish();
                        RequestManager.getInstance().init(getBaseContext());
                        RequestManager.getInstance().paymentRequest(cardToken.getId());

                    }

                    @Override

                    public void onError(Throwable throwable) {

                        Toast.makeText(getBaseContext(), "Success", Toast.LENGTH_SHORT).show();

                    }

                });


            }

        });
    }
}

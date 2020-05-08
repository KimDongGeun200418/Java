package com.example.registerloginexample;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private TextView tv_id, tv_pass; //필요없는 부분
    private Button btn_logout; //로그아웃 버튼
    private long backBtnTime = 0; //back버튼 두번 시간


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tv_id = findViewById(R.id.tv_id);
        tv_pass = findViewById(R.id.tv_pass);
        btn_logout = findViewById(R.id.btn_logout);

        //필요없는 부분 - 로그인액티비티에서 가져온 값
        Intent intent = getIntent();
        String userID = intent.getStringExtra("userID");
        String userPass = intent.getStringExtra("userPass");

        tv_id.setText(userID);
        tv_pass.setText(userPass);
        //필요없는 부분-end

        //로그아웃 버튼 클릭시
        btn_logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*Intent intent = new Intent(MainActivity.this, LoginActivity.class);
                startActivity(intent);*/
                finish();
            }
        });

    }//onCreate-mainMethod-End


    //백버튼 2번 눌러야 종료되게 설정
    @Override
    public void onBackPressed() {//뒤로가기 버튼이 눌렸을 때
        long curTime = System.currentTimeMillis();
        long gapTime = curTime - backBtnTime; //백버튼 누르는 간격 체크

        if(0 <= gapTime && gapTime <= 2000){ //2초 내에 다시 누르면 종료
            super.onBackPressed();
        }else{
            backBtnTime = curTime; //현재 시간 저장
            Toast.makeText(this,"한번 더 누르면 종료됩니다.",Toast.LENGTH_SHORT).show();
        }

    }//onBackPressed-Method-End
}

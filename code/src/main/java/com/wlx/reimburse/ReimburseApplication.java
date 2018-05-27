package com.wlx.reimburse;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.wlx.reimburse.dao")
public class ReimburseApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReimburseApplication.class, args);
	}
}

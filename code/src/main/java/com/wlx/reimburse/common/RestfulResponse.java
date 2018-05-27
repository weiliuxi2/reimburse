package com.wlx.reimburse.common;

public class RestfulResponse<T> {

	private String message;
	
	private Integer code = 1000;
	
	private T data;
	
	public RestfulResponse(T t){
		this.data = t;
	}
	
	public RestfulResponse(){
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public T getData() {
		return data;
	}

	public void setData(T t) {
		this.data = t;
	}
	
	
}

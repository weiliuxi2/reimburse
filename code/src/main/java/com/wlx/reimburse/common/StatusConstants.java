package com.wlx.reimburse.common;

public enum StatusConstants {

	INIT(1,"未上报"),
	
	RUNNING(2,"审批中"),
	
	PASS(3,"通过"),
	
	NO_PASS(4,"驳回"),
	
	;
	
	private int code;
	
	private String name;
	
	
	
	public int getCode() {
		return code;
	}



	public String getName() {
		return name;
	}

	StatusConstants(int code,String name) {
		this.code = code;
		this.name = name;
	}
	
	public static StatusConstants getByCode(int code){
		for (StatusConstants s : StatusConstants.values()) {
			if (s.getCode() == code) {
				return s;
			}
		}
		return null;
	}
}

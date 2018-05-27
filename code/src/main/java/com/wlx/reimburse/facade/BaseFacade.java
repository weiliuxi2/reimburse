package com.wlx.reimburse.facade;

import java.sql.Timestamp;

import com.wlx.reimburse.model.BaseVO;

public class BaseFacade {

	
	public <T extends BaseVO> void setSaveTime(T data){
		Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
		data.setCreateTime(timeStamp);
		data.setUpdateTime(timeStamp);
	}
	
	public <T extends BaseVO> void setUpdateTime(T data){
		Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
		data.setUpdateTime(timeStamp);
	}
	

	
}

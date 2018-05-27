package com.wlx.reimburse.dao;

import java.util.List;

import com.wlx.reimburse.model.ReimburseDetailVO;


public interface ReimburseDetailDAO extends BaseDAO<ReimburseDetailVO>{
	
	
	int saves(List<ReimburseDetailVO> details);
	
	void deleteByDanHao(String danHao);
}

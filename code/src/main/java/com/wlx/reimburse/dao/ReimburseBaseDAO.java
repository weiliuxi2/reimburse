package com.wlx.reimburse.dao;

import com.wlx.reimburse.model.ReimburseBaseVO;


public interface ReimburseBaseDAO extends BaseDAO<ReimburseBaseVO>{
	
	void deleteByDanHao(String danHao);
	
	int getSizeByVO(ReimburseBaseVO vo);
}

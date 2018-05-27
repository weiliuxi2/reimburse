package com.wlx.reimburse.dao;

import java.util.List;

import com.wlx.reimburse.model.EmploymentVO;


public interface EmploymentDAO extends BaseDAO<EmploymentVO>{
	
	List<EmploymentVO> queryByVO(EmploymentVO vo);
	EmploymentVO queryOneByVO(EmploymentVO vo);
	
	/*List<BigTypeVO> queryBigTypes();
	
	List<BigTypeVO> queryBigTypesPaging(BigTypeVO bigType);

	int saveBigType(BigTypeVO bigTypeVO);
	
	void updateBigType(BigTypeVO bigTypeVO);
	
	void deleteBigType(int id);*/
}

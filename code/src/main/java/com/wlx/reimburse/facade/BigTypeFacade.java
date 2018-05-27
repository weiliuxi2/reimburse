package com.wlx.reimburse.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wlx.reimburse.dao.BigTypeDAO;
import com.wlx.reimburse.model.BigTypeVO;

@Component
public class BigTypeFacade extends BaseFacade{

	@Autowired
	private BigTypeDAO bigTypeDAO;
	
	public List<BigTypeVO> query(){
		return bigTypeDAO.query();
	}
	
	public List<BigTypeVO> queryPaging(BigTypeVO bigType){
		return bigTypeDAO.queryPaging();
	}
	
	public boolean save(BigTypeVO bigTypeVO){
		super.setSaveTime(bigTypeVO);
		bigTypeDAO.save(bigTypeVO);	
		return true;
	}
	
	public boolean update(BigTypeVO bigTypeVO){
		super.setUpdateTime(bigTypeVO);
		bigTypeDAO.update(bigTypeVO);
		return true;
	}
	
	public boolean delete(int id){
		bigTypeDAO.delete(id);
		return true;
	}
	
	
	
}

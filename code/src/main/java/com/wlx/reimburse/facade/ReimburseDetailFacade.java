package com.wlx.reimburse.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wlx.reimburse.dao.ReimburseDetailDAO;
import com.wlx.reimburse.model.ReimburseDetailVO;

@Component
public class ReimburseDetailFacade extends BaseFacade{

	@Autowired
	private ReimburseDetailDAO reimburseDetailDAO;
	
	public List<ReimburseDetailVO> query(){
		return reimburseDetailDAO.query();
	}
	
	public List<ReimburseDetailVO> getByVO(ReimburseDetailVO vo){
		return reimburseDetailDAO.getByVO(vo);
	}
	
	public List<ReimburseDetailVO> queryPaging(ReimburseDetailVO vo){
		return reimburseDetailDAO.queryPaging();
	}
	
	public boolean save(ReimburseDetailVO vo){
		super.setSaveTime(vo);
		reimburseDetailDAO.save(vo);	
		return true;
	}
	
	public boolean saves(List<ReimburseDetailVO> details){
		for (ReimburseDetailVO vo : details) {
			super.setSaveTime(vo);
		}
		reimburseDetailDAO.saves(details);	
		return true;
	}
	
	public boolean update(ReimburseDetailVO vo){
		super.setUpdateTime(vo);
		reimburseDetailDAO.update(vo);
		return true;
	}
	
	public boolean delete(int id){
		reimburseDetailDAO.delete(id);
		return true;
	}
	
	public boolean deleteByVO(ReimburseDetailVO vo){
		reimburseDetailDAO.deleteByVO(vo);
		return true;
	}
	
	
	
	
	
}

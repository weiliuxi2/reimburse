package com.wlx.reimburse.dto;

import java.util.List;

import com.wlx.reimburse.model.ReimburseBaseVO;
import com.wlx.reimburse.model.ReimburseDetailVO;

public class ReimburseDTO {

	private ReimburseBaseVO reimburseBase;
	
	private List<ReimburseDetailVO> reimburseDetails;

	public ReimburseBaseVO getReimburseBase() {
		return reimburseBase;
	}

	public void setReimburseBase(ReimburseBaseVO reimburseBase) {
		this.reimburseBase = reimburseBase;
	}

	public List<ReimburseDetailVO> getReimburseDetails() {
		return reimburseDetails;
	}

	public void setReimburseDetails(List<ReimburseDetailVO> reimburseDetails) {
		this.reimburseDetails = reimburseDetails;
	}
	
	
}

package br.com.adaApi.api.dto;

import java.io.Serializable;

public class DropDown<T extends Serializable > {
	
	private String label;
	private T value;
	
	public DropDown(String label, T value) {
		super();
		this.label = label;
		this.value = value;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public T getValue() {
		return value;
	}

	public void setValue(T value) {
		this.value = value;
	}
	
	

}

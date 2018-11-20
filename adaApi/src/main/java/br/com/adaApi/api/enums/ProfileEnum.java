package br.com.adaApi.api.enums;

public enum ProfileEnum {
	
	ROLE_ADMIN("ADMIN"),
	ROLE_CUSTUMER("CUSTUMER"),
	ROLE_TECHNICIAN("TECHNICIAN");
	
	private String label;
	
	private ProfileEnum(final String label) {
        this.label = label;
    }
	
	public String getLabel() {
        return this.label;
    }

}

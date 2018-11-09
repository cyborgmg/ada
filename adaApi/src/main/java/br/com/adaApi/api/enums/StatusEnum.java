package br.com.adaApi.api.enums;

public enum StatusEnum {
	
	B("Basic", "B"),
	S("Simple", "S"),
	P("Plus", "P");

    private String label;

    private String valor;

    private StatusEnum(final String label, final String valor) {
        this.label = label;
        this.valor = valor;
    }

    public String getLabel() {
        return this.label;
    }

    public String getValor() {
        return this.valor;
    }

}

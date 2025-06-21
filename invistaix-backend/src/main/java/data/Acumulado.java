package data;

public class Acumulado {
    // https://brasilindicadores.com.br/incc-m
    public static void main(String[] args) {
        double[] meses = {0.61, 0.67, 0.44, 0.51, 0.71, 0.51, 0.38, 0.59, 0.64, 0.69, 0.93, 0.59};
        System.out.printf("Acumulado: %.2f%%\n", calcularAcumulado(meses));
    }

    public static double calcularAcumulado(double[] meses) {
        double acumulado = 1.0;
        for (double m : meses) acumulado *= (1 + m / 100);
        return (acumulado - 1) * 100;
    }
}
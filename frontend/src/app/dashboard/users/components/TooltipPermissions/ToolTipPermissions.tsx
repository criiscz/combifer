import styles from "./style.module.css";
import {Icon} from "@iconify/react";

export default function ToolTipPermissions(){
    return(
      <div className={styles.tooltip}>
        <Icon className={styles.tooltipicon} icon={'ri:question-line'}/>
        <span className={styles.tooltiptext}>
                  <div className={styles.tooltip__title}>¿Como calcular el nivel?</div>
                  <div className={styles.tooltip__overview}>
                    <span className={styles.tooltip__overview_item_active}>1</span>
                    <span className={styles.tooltip__overview_item_active}>2</span>
                    <span className={styles.tooltip__overview_item}>3</span>
                    <span className={styles.tooltip__overview_item}>4</span>
                    <span className={styles.tooltip__overview_item_active}>5</span>
                    <span className={styles.tooltip__overview_item_active}>6</span>
                  </div>
                  <div className={styles.tooltip__description}>
                    <p className={styles.tooltip__description_text}>
                      1 -&gt; Acceso al sistema<br/>
                      2 -&gt; Acceso a inventario<br/>
                      3 -&gt; Acceso a ventas<br/>
                      4 -&gt; Acceso a reportes<br/>
                      5 -&gt; Acceso a ordenes<br/>
                      6 -&gt; Acceso a configuración<br/>
                    </p>
                    <div className={styles.tooltip__description_icons}>
                      <span className={styles.tooltip__description_icons_access}>Acceso</span>
                      <span className={styles.tooltip__description_icons_noaccess}>No Acceso</span>
                    </div>
                  </div>
                </span>
      </div>
    )
}
import Image from 'next/image';
import styles from '../login.module.css'

export default function LogoLogin({style, width=200, height=200}: IProps) {
  const styleIsVertical = style === 'vertical';

  return (
    <div className={styleIsVertical ? styles.logo : styles.logo_h}>
      <Image src="/icon.png" alt="logo" width={width} height={height}/>
      <h1>FERRETERÍA</h1>
      <h2>COMBIFER</h2>
    </div>
  );
}

interface IProps {
  style?: 'vertical' | 'horizontal';
  width?: number;
  height?: number;

}